import { configureStore } from '@reduxjs/toolkit';

import posts from './slices/posts';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
