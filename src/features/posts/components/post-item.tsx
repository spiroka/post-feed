import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { PostAuthor } from './post-author';
import { Post } from '../types';

type Props = {
  post: Post;
}

export function PostItem({ post: { _id, title, body, _creationTime, highlight, author } }: Props) {
  return (
    <Card className={cn('max-w-md', { 'animate-highlight': highlight })}>
      <CardHeader>
        <CardTitle className="mb-5 underline">
          <Link href={`posts/${_id}`}>{title}</Link>
        </CardTitle>
        <CardDescription>
          <PostAuthor
            authorName={author.name}
            authorAvatarUrl={author.avatarUrl}
            creationTime={_creationTime}
            small
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2">
          {body}
        </div>
      </CardContent>
    </Card>
  );
}
