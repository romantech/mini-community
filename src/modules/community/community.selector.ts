import { RootState as T } from 'modules/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCategories = ({ community }: T) => community.categories;
export const selectCurrentCategoryId = ({ community }: T) =>
  community.currentCategoryId;

export const selectPostList = ({ community }: T) => community.posts;
export const selectPost = ({ community }: T) => community.selectedPost;
export const selectLikedPosts = ({ community }: T) => community.likedPostId;
export const selectDraft = ({ community }: T) => community.draft;

export const selectLoading = ({ community }: T) => community.loading;
export const selectLastPosition = ({ community }: T) => community.lastPosition;

export const selectPostsByCategory = createSelector(
  [selectPostList, selectCurrentCategoryId],
  (posts, currentCatId) => {
    switch (currentCatId) {
      case 888: // 전체글
        return posts;
      case 999: // 인기글
        return posts
          .filter(({ viewCount }) => viewCount >= 100)
          .sort(({ likeCount: a }, { likeCount: b }) => b - a); // 내림차순
      default:
        return posts.filter(({ categoryId }) => categoryId === currentCatId);
    }
  },
);

export const selectNonFixedCategory = createSelector(
  [selectCategories],
  categories => categories.slice(2), // 전체글, 인기글 제외
);

export const selectCurrentPostIsLike = createSelector(
  [selectPost, selectLikedPosts],
  (post, likedPosts) => {
    return !post ? false : likedPosts.includes(post.id);
  },
);

export const selectDraftCanSubmit = createSelector([selectDraft], draft => {
  const checkItems: Extract<keyof Draft, 'title' | 'content'>[] = [
    'title',
    'content',
  ];
  return checkItems.every(key => draft[key]);
});

export const selectDraftUploadedImg = createSelector(
  [selectDraft],
  draft => draft.imageUrl,
);

export const selectUploadedNum = createSelector(
  [selectDraftUploadedImg],
  images => images?.length ?? 0,
);
