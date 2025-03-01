import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn, formatRelativeDate } from '@/lib/utils';

type Props = {
  title: string;
  body: string;
  creationTime: number;
  highlight?: boolean;
}

export function Post({ title, body, creationTime, highlight }: Props) {
  return (
    <Card className={cn('max-w-md', { 'animate-highlight': highlight })}>
      <CardHeader>
        <CardTitle className="mb-5">{title}</CardTitle>
        <CardDescription>
          <div className="flex h-3 gap-2 items-center text-xs">
            <Avatar>
              <AvatarImage alt="the user's avatar" src="https://placecats.com/100/100" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
            <Separator orientation="vertical" decorative />
            <span suppressHydrationWarning>{formatRelativeDate(creationTime)}</span>
          </div>
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
