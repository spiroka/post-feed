import { fetchQuery } from 'convex/nextjs';

import { api } from '../../convex/_generated/api';
import PostsListContainer from './components/posts-list-container';

export default async function Home() {
  const initialResults = await fetchQuery(api.posts.list, { paginationOpts: { numItems: 20, cursor: null } });

  return (
    <PostsListContainer initialResults={initialResults} />
  );
}
