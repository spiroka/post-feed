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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {post && (
          <PostContainer post={post} />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
