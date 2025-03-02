'use client';

import { ArrowLeft } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGoBackOrDefault } from '@/lib/hooks/useGoBackOrDefault';

import { PostAuthor } from './post-author';
import type { Post as PostType } from '../types';

type Props = {
  post: PostType;
}


export function Post({ post }: Props) {
  const goBack = useGoBackOrDefault('/');

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center mb-5 text-2xl">
          <Button
            variant="ghost"
            onClick={goBack}
          >
            <ArrowLeft />
          </Button>
          {post.title}
        </CardTitle>
        <CardDescription>
          <PostAuthor
            authorName="John Doe"
            authorAvatarUrl="https://placecats.com/100/100"
            creationTime={post._creationTime}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        {post.body}
      </CardContent>
    </Card>
  );
}
