'use client';

import { useGetPostsInfiniteQuery } from '@/store/slices/api';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Spinner } from '@/components/ui/spinner';

import type { Post as PostType } from '../types';
import { Post } from './post';

type Props = {
  initialPosts: PostType[];
}

export function PostsList({ initialPosts }: Props) {
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPostsInfiniteQuery();
  const posts = data?.pages.flatMap(({ page }) => page);

  return (
    <section role="feed" aria-label="Posts" className="flex flex-col gap-4">
      {!posts?.length && initialPosts.map((post) => (
        <Post key={post.title} title={post.title} body={post.body} />
      ))}
      {posts?.map((post) => (
        <Post key={post.title} title={post.title} body={post.body} />
      ))}
      <InfiniteScroll
        isLoading={isLoading}
        hasMore={hasNextPage}
        next={fetchNextPage}
        rootMargin="500px"
      >
        {hasNextPage && <div><Spinner /></div>}
      </InfiniteScroll>
    </section>
  );
}
