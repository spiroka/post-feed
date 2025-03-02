'use client';

import { useCallback, useRef } from 'react';

import apiSlice, { useGetPostsInfiniteQuery } from '@/store/slices/api';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Spinner } from '@/components/ui/spinner';
import { useAppDispatch } from '@/lib/hooks';

import type { Post as PostType } from '../types';
import { useNewPostNotifier } from '../hooks/use-new-post-notifier';
import { PostItem } from './post-item';

type Props = {
  initialPosts: PostType[];
}

export function PostsList({ initialPosts }: Props) {
  const dispatch = useAppDispatch();
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPostsInfiniteQuery();
  const containerRef = useRef<HTMLElement>(null);
  const allPosts = data?.pages.flatMap(({ page }) => page);
  const mostRecentPostDate = allPosts?.[0]?._creationTime;
  // initial posts will be rendered on the server and then updated on the client
  const posts = !allPosts?.length ? initialPosts : allPosts;

  const onShowNewPosts = useCallback((newPosts: PostType[]) => {
    // adding new posts to the top of the list
    dispatch(apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
      newPosts.forEach((post) => {
        if (!draft.pages[0]?.page.find((p) => p._id === post._id)) {
          draft.pages[0]?.page.unshift({ ...post, highlight: true });
        }
      });
    }));
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch]);

  useNewPostNotifier({ mostRecentPostDate, onShowNewPosts });

  return (
    <section ref={containerRef} role="feed" aria-label="Posts" className="flex flex-col gap-4 scroll-m-20">
      {posts.map((post) => (
        <PostItem
          key={post._id}
          id={post._id}
          title={post.title}
          body={post.body}
          creationTime={post._creationTime}
          highlight={post.highlight}
        />
      ))}
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
