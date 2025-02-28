import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchQuery } from 'convex/nextjs';
import { PaginationResult } from 'convex/server';

import { Post } from '@/features/posts/types';
import { api } from '@/convex/_generated/api';

const noopBaseQuery = () => Promise.resolve({ data: undefined });

const apiSlice = createApi({
  baseQuery: noopBaseQuery,
  endpoints: (build) => ({
    getPosts: build.infiniteQuery<PaginationResult<Post>, void, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage: PaginationResult<Post>) => (
          lastPage.isDone ? undefined : lastPage.continueCursor
        )
      },
      queryFn: async ({ pageParam }) => {
        const data = await fetchQuery(api.posts.list, { paginationOpts: { numItems: 20, cursor: pageParam } }) as unknown as PaginationResult<Post>;

        return { data } ;
      }
    })
  })
});

export default apiSlice;

export const { useGetPostsInfiniteQuery } = apiSlice;
