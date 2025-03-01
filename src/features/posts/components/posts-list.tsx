'use client';

import { useGetPostsInfiniteQuery } from '@/store/slices/api';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Spinner } from '@/components/ui/spinner';

import type { Post as PostType } from '../types';
import { useNewPostNotifier } from '../hooks/use-new-post-notifier';
import { Post } from './post';
import { useCallback, useRef, useState } from 'react';

type Props = {
  initialPosts: PostType[];
}

export function PostsList({ initialPosts }: Props) {
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPostsInfiniteQuery();
  const [newPosts, setNewPosts] = useState<PostType[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const posts = data?.pages.flatMap(({ page }) => page);
  const mostRecentPostDate = posts?.[0]?._creationTime;

  const onShowNewPosts = useCallback((newPosts: PostType[]) => {
    setNewPosts(newPosts);
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useNewPostNotifier({ mostRecentPostDate, onShowNewPosts });

  return (
    <section ref={containerRef} role="feed" aria-label="Posts" className="flex flex-col gap-4 scroll-m-20">
      {newPosts?.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          body={post.body}
          creationTime={post._creationTime}
          highlight
        />
      ))}
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
