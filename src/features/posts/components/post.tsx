import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  title: string;
  body: string;
}

export function Post({ title, body }: Props) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage alt="the user's avatar" src="https://placecats.com/100/100" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span>{title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2">
          {body}
        </div>
      </CardContent>
    </Card>
  );
}
