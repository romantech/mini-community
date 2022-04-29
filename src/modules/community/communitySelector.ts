import { RootState } from 'modules/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectPosts = (state: RootState) => state.community.posts;
export const selectPost = (state: RootState) => state.community.selectedPost;
export const selectLikedPosts = (state: RootState) => state.community.likedPost;
export const selectCategories = (state: RootState) =>
  state.community.categories;
export const selectCurrentCategoryId = (state: RootState) =>
  state.community.currentCategoryId;
export const selectLoading = (state: RootState) => state.community.loading;
export const selectLastPosition = (state: RootState) =>
  state.community.lastPosition;

export const selectPostsByCategory = createSelector(
  [selectPosts, selectCurrentCategoryId],
  (posts, currentCatId) => {
    switch (currentCatId) {
      case 0: // 전체
        return posts;
      case 999: // 인기글
        return posts.filter(({ viewCount }) => viewCount >= 100);
      default:
        return posts.filter(({ categoryId }) => categoryId === currentCatId);
    }
  },
);

export const selectNonFixedCategory = createSelector(
  [selectCategories],
  categories => categories.slice(2),
);

export const selectCurrentPostIsLike = createSelector(
  [selectPost, selectLikedPosts],
  (post, likedPosts) => {
    return !post ? false : likedPosts.includes(post.id);
  },
);

export const selectHasPosts = createSelector(
  [selectPosts],
  posts => posts.length > 1,
);

export const selectHasCategories = createSelector(
  [selectCategories],
  categories => categories.length > 2, // 전체 / 인기글은 기본값이므로 3이상만 true
);
