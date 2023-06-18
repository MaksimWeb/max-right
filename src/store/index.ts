import { configureStore } from '@reduxjs/toolkit';
import PostsReducer from './post';
import UserReducer from './users';

export const store = configureStore({
  reducer: { posts: PostsReducer, user: UserReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
