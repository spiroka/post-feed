'use client';

import { useGetPostsInfiniteQuery } from '@/store/slices/api';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Spinner } from '@/components/ui/spinner';

import type { Post as PostType } from '../types';
import { useNewPostNotifier } from '../hooks/use-new-post-notifier';
import { Post } from './post';

type Props = {
  initialPosts: PostType[];
}

export function PostsList({ initialPosts }: Props) {
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPostsInfiniteQuery();
  const posts = data?.pages.flatMap(({ page }) => page);
  const mostRecentPostDate = posts?.[0]?._creationTime;
  useNewPostNotifier({ mostRecentPostDate });

  return (
    <section role="feed" aria-label="Posts" className="flex flex-col gap-4">
      {!posts?.length && initialPosts.map((post) => (
        <Post key={post._id} title={post.title} body={post.body} creationTime={post._creationTime} />
      ))}
      {posts?.map((post) => (
        <Post key={post._id} title={post.title} body={post.body} creationTime={post._creationTime} />
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
