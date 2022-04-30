import { RootState } from 'modules/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCategories = (state: RootState) =>
  state.community.categories;
export const selectCurrentCategoryId = (state: RootState) =>
  state.community.currentCategoryId;

export const selectPosts = (state: RootState) => state.community.posts;
export const selectPost = (state: RootState) => state.community.selectedPost;
export const selectLikedPosts = (state: RootState) =>
  state.community.likedPostId;
export const selectNewPost = (state: RootState) => state.community.newPost;

export const selectLoading = (state: RootState) => state.community.loading;
export const selectLastPosition = (state: RootState) =>
  state.community.lastPosition;

export const selectPostsByCategory = createSelector(
  [selectPosts, selectCurrentCategoryId],
  (posts, currentCatId) => {
    switch (currentCatId) {
      case 888: // 전체글
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

export const selectNewPostCanSubmit = createSelector(
  [selectNewPost],
  newPost => {
    const checkItems: Partial<keyof NewPost>[] = ['title', 'content'];
    return checkItems.every(key => newPost[key]);
  },
);

export const selectNewPostImages = createSelector(
  [selectNewPost],
  newPost => newPost.imageUrl,
);

export const selectUploadedNum = createSelector(
  [selectNewPostImages],
  images => images?.length ?? 0,
);
