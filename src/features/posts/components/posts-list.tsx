'use client';

import type { Post as PostType } from '../types';
import { PostItem } from './post-item';

type Props = {
  posts: PostType[];
}

export function PostsList({ posts }: Props) {
  return (
    <>
      {posts.map((post) => post && (
        <PostItem
          key={post._id}
          id={post._id}
          title={post.title}
          body={post.body}
          creationTime={post._creationTime}
          highlight={post.highlight}
        />
      ))}
    </>
  );
}
