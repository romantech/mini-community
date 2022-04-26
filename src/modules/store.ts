import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import communityReducer from './community/communitySlice';

export const store = configureStore({
  reducer: { community: communityReducer },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
