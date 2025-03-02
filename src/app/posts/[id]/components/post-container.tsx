'use client';

import { useRef } from 'react';
import { notFound } from 'next/navigation';

import type { Post as PostType } from '@/features/posts/types';
import { hydratePostAction, useGetPostByIdQuery } from '@/store/slices/api';
import { useAppDispatch } from '@/lib/hooks';
import { Post } from '@/features/posts/components/post';

type Props = {
  post: PostType;
}

export function PostContainer({ post: initialPost }: Props) {
  const isInitializedRef = useRef(false);
  const dispatch = useAppDispatch();

  if (!isInitializedRef.current) {
    dispatch(hydratePostAction(initialPost));
    isInitializedRef.current = true;
  }

  const { data: post, isSuccess } = useGetPostByIdQuery(initialPost._id);

  if (isSuccess && !post) {
    notFound();
  }

  return <Post post={post || initialPost} />;
}
