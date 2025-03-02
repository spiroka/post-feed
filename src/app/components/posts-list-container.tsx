'use client';

import { useCallback, useEffect, useRef } from 'react';
import { PaginationResult } from 'convex/server';

import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Spinner } from '@/components/ui/spinner';
import { PostsList } from '@/features/posts/components/posts-list';
import { useNewPostNotifier } from '@/features/posts/hooks/use-new-post-notifier';
import { Post } from '@/features/posts/types';
import { useAppDispatch } from '@/lib/hooks';
import { addNewPostsAction, hydratePostsAction, removePostHighlightsAction, useGetPostsInfiniteQuery } from '@/store/slices/api';

type Props = {
  initialResults: PaginationResult<Post>;
}

export default function PostsListContainer({ initialResults }: Props) {
  const dispatch = useAppDispatch();
  const isInitializedRef = useRef(false);
  const { page: initialPosts } = initialResults;
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPostsInfiniteQuery();
  const containerRef = useRef<HTMLElement>(null);
  const allPosts = data?.pages.flatMap(({ page }) => page);
  const mostRecentPostDate = allPosts?.[0]?._creationTime;
  // initial posts will be rendered on the server and then updated on the client
  const posts = !allPosts?.length ? initialPosts : allPosts;

  if (!isInitializedRef.current) {
    dispatch(hydratePostsAction(initialResults));
    isInitializedRef.current = true;
  }

  const onShowNewPosts = useCallback((newPosts: Post[]) => {
    // adding new posts to the top of the list and highlighting them
    dispatch(addNewPostsAction(newPosts));
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch]);

  useNewPostNotifier({ mostRecentPostDate, onShowNewPosts });

  useEffect(() => () => {
    // avoid highlighting posts again
    dispatch(removePostHighlightsAction());
  }, [dispatch]);

  return (
    <section ref={containerRef} role="feed" aria-label="Posts" className="flex flex-col gap-4 scroll-m-20">
      <PostsList posts={posts} />
      <InfiniteScroll
        isLoading={isLoading}
        hasMore={hasNextPage}
        next={fetchNextPage}
      >
        {hasNextPage && <div><Spinner /></div>}
      </InfiniteScroll>
    </section>
  );
}
