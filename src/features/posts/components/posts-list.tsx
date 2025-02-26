'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setPosts } from '@/store/slices/posts';

import type { Post as PostType } from '../types';
import { Post } from './post';

type Props = {
  initialPosts: PostType[];
}

export function PostsList({ initialPosts }: Props) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(({ posts }) => posts.items);

  useEffect(() => {
    dispatch(setPosts(initialPosts));
  }, [dispatch, initialPosts]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.title} title={post.title} body={post.body} />
      ))}
    </>
  );
}
