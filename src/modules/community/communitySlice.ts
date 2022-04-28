import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCategories,
  getPosts,
  getPostsById,
  patchPostData,
} from './communityThunk';

interface CommunityState {
  posts: Post[];
  selectedPost: PostDetail | null;
  likedPost: Array<Post['id']>;
  newPost: NewPost | null;
  categories: Category[];
  currentCategory: CategoryId;
  lastPosition: number | null; // 리스트에서 포스트를 클릭했을 때의 스크롤
  loading: boolean;
  error: Error | null;
}

const initialState: CommunityState = {
  posts: [],
  likedPost: [],
  selectedPost: null,
  newPost: null,
  categories: [
    // 카테고리 초기값
    { categoryId: 0, categoryCode: 'ALL', categoryName: '전체' },
    { categoryId: 999, categoryCode: 'POPULAR', categoryName: '⭐ 인기글' },
  ],
  currentCategory: 0, // 전체 (초기값)
  lastPosition: null,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<CategoryId>) => {
      state.currentCategory = action.payload;
    },
    setLastPosition: (state, action: PayloadAction<number>) => {
      state.lastPosition = action.payload;
    },
    addLikedPost: (state, action: PayloadAction<Post['id']>) => {
      state.likedPost.push(action.payload);
    },
    removeLikedPost: (state, action: PayloadAction<Post['id']>) => {
      state.likedPost = state.likedPost.filter(
        likedPk => likedPk !== action.payload,
      );
    },
  },
  // extraReducer 는 액션을 자동으로 생성하지 않음
  // createAsyncThunk 같은 별도 액션이 존재하는 함수의 reducer 를 정의할 때 유용
  extraReducers: {
    // 포스트 목록
    [getPosts.pending.type]: state => {
      state.loading = true;
    },
    [getPosts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts = payload;
    },
    [getPosts.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
    // 1개 포스트
    [getPostsById.pending.type]: state => {
      state.loading = true;
    },
    [getPostsById.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      const [post] = payload;
      state.selectedPost = post;
    },
    [getPostsById.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
    // 카테고리 목록
    [getCategories.pending.type]: state => {
      state.loading = true;
    },
    [getCategories.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.categories.push(...payload);
    },
    [getCategories.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
    // 좋아요 상태 업데이트
    [patchPostData.pending.type]: state => {
      state.loading = true;
    },
    [patchPostData.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.selectedPost = payload;
    },
    [patchPostData.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
  },
});

export const {
  changeCategory,
  setLastPosition,
  addLikedPost,
  removeLikedPost,
} = communitySlice.actions;
export default communitySlice.reducer;
