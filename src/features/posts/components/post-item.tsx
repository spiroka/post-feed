import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { PostAuthor } from './post-author';

type Props = {
  id: Id<'posts'>;
  title: string;
  body: string;
  creationTime: number;
  highlight?: boolean;
}

export function PostItem({ id, title, body, creationTime, highlight }: Props) {
  return (
    <Card className={cn('max-w-md', { 'animate-highlight': highlight })}>
      <CardHeader>
        <CardTitle className="mb-5 underline">
          <Link href={`posts/${id}`}>{title}</Link>
        </CardTitle>
        <CardDescription>
          <PostAuthor
            authorName="John Doe"
            authorAvatarUrl="https://placecats.com/100/100"
            creationTime={creationTime}
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
