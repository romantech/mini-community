import { RootState } from 'modules/store';
import { createSelector } from '@reduxjs/toolkit';

const selectPosts = (state: RootState) => state.community.posts;
const selectCategory = (state: RootState) => state.community.currentCategory;

// eslint-disable-next-line import/prefer-default-export
export const selectPostsByCategory = createSelector(
  [selectPosts, selectCategory],
  (posts, category) => {
    return category === 0
      ? posts
      : posts.filter(({ categoryPk }) => categoryPk === category);
  },
);
