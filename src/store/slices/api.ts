import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchQuery } from 'convex/nextjs';
import { PaginationResult } from 'convex/server';

import { Post } from '@/features/posts/types';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const noopBaseQuery = () => Promise.resolve({ data: undefined });

const apiSlice = createApi({
  baseQuery: noopBaseQuery,
  tagTypes: ['Post'],
  reducerPath: 'api',
  endpoints: (build) => ({
    getPosts: build.infiniteQuery<PaginationResult<Post>, void, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => (
          lastPage.isDone ? undefined : lastPage.continueCursor
        )
      },
      queryFn: async ({ pageParam }) => {
        const data = await fetchQuery(api.posts.list, { paginationOpts: { numItems: 20, cursor: pageParam } });

        return { data } ;
      },
      providesTags: (result) => {
        // @ts-expect-error https://github.com/reduxjs/redux-toolkit/issues/4859
        if (result?.pages) {
          return ['Post'];
        }

        // @ts-expect-error https://github.com/reduxjs/redux-toolkit/issues/4859
        // eslint-disable-next-line
        return [...pages.page.flatMap(({ _id }) => ({ type: 'Post' as const, id: _id })), 'Post']
      }
    }),
    getPostById: build.query<Post | null, Id<'posts'>>({
      queryFn: async (id) => {
        const data = await fetchQuery(api.posts.byId, { id });

        return { data };
      },
      providesTags: (result) => result ? [{ type: 'Post', id: result._id }] : [],
    })
  })
});

export function addNewPostsAction(newPosts: Post[]) {
  return apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
    newPosts.forEach((post) => {
      if (!draft.pages[0]?.page.find((p) => p._id === post._id)) {
        draft.pages[0]?.page.unshift({ ...post, highlight: true });
      }
    });
  });
}

export function removePostHighlightsAction() {
  return apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
    draft.pages[0]?.page.forEach((post) => {
      post.highlight = false;
    });
  });
}

export function hydratePostAction(post: Post) {
  return apiSlice.util.upsertQueryData('getPostById', post._id, post);
}

export function hydratePostsAction(initialResults: PaginationResult<Post>) {
  return apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
    if (!draft) {
      return {
        pageParams: [null],
        pages: [initialResults]
      };
    }

    // state is already initialized
    return draft;
  });
}

export default apiSlice;

export const { useGetPostsInfiniteQuery, useGetPostByIdQuery } = apiSlice;
