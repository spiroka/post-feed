import { notFound } from 'next/navigation';

import { Id } from '@/convex/_generated/dataModel';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

import { PostContainer } from './components/post-container';

type Props = { params: Promise<{ id: Id<'posts'> }> };

export default async function PostPage({ params }: Props) {
  const post = await fetchQuery(api.posts.byId, { id: (await params).id });

  if (!post) {
    notFound();
  }

  return (
    <>
      {post && (
        <PostContainer post={post} />
      )}
    </>
  );
}
