import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/features/posts/types';

interface PostsState {
  items: Post[];
}

const initialState: PostsState = { items: [] };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
