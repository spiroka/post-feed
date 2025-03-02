'use client';

import type { Post as PostType } from '../types';
import { PostItem } from './post-item';

type Props = {
  posts: PostType[];
}

export function PostsList({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
}
