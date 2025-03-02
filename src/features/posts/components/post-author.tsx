'use client';

import { useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn, formatRelativeDate } from '@/lib/utils';

const authorVariants = cva('flex items-center', {
  variants: {
    small: {
      false: 'flex-col gap-1',
      true: 'h-3 gap-2'
    }
  },
  defaultVariants: {
    small: false
  }
});

type Props = {
  authorName: string;
  authorAvatarUrl: string;
  creationTime: number;
} & VariantProps<typeof authorVariants>;

export function PostAuthor({ authorName, authorAvatarUrl, creationTime, small }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={cn(authorVariants({ small }))}>
      <Avatar size={small ? 'small' : 'large'} className={cn({ 'mb-2': !small })}>
        <AvatarImage alt={`${authorName}'s avatar`} src={authorAvatarUrl} />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <span>{authorName}</span>
      <Separator orientation="vertical" decorative />
      {/* avoid formatting the date on the server, client can be in different timezone */}
      <span suppressHydrationWarning>{isClient && formatRelativeDate(creationTime)}</span>
    </div>
  );
}
