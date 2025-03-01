import { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';

import type { Post } from '../types';

type Props = {
  mostRecentPostDate?: number;
  onShowNewPosts: (newPosts: Post[]) => void;
};

export function useNewPostNotifier({ mostRecentPostDate, onShowNewPosts }: Props) {
  // Convex queries are updated realtime when a new document is added
  const newPosts = useQuery(api.posts.postsAfterDate, { date: mostRecentPostDate });

  useEffect(() => {
    if (newPosts?.length) {
      toast('New posts available!', {
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onShowNewPosts(newPosts)}
          >
            Show
          </Button>
        ),
        classNames: {
          toast: 'justify-between'
        }
      });
    }
  }, [newPosts, onShowNewPosts]);
}
