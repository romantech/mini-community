import { RootState } from 'modules/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectPosts = (state: RootState) => state.community.posts;
export const selectCategories = (state: RootState) =>
  state.community.categories;
export const selectCurrentCategory = (state: RootState) =>
  state.community.currentCategory;

export const selectPostsByCategory = createSelector(
  [selectPosts, selectCurrentCategory],
  (posts, category) => {
    switch (category) {
      case 0: // 전체
        return posts;
      case 999: // 인기글
        return posts.filter(({ viewCount }) => viewCount >= 100);
      default:
        return posts.filter(({ categoryPk }) => categoryPk === category);
    }
  },
);
