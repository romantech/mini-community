import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories, getPostByPk, getPosts } from './communityThunk';

interface CommunityState {
  posts: Post[];
  selectedPost: PostDetail | null;
  newPost: NewPost | null;
  categories: Category[];
  currentCategory: CategoryPk;
  lastPosition: number | null; // 리스트에서 포스트를 클릭했을 때의 스크롤
  loading: boolean;
  error: Error | null;
}

const initialState: CommunityState = {
  posts: [],
  selectedPost: null,
  newPost: null,
  categories: [
    // 카테고리 초기값
    { categoryPk: 0, categoryCode: 'ALL', categoryName: '전체' },
    { categoryPk: 999, categoryCode: 'POPULAR', categoryName: '⭐ 인기글' },
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
    changeCategory: (state, action: PayloadAction<CategoryPk>) => {
      state.currentCategory = action.payload;
    },
    setLastPosition: (state, action: PayloadAction<number>) => {
      state.lastPosition = action.payload;
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
    [getPostByPk.pending.type]: state => {
      state.loading = true;
    },
    [getPostByPk.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      const [post] = payload;
      state.selectedPost = post;
    },
    [getPostByPk.rejected.type]: (state, { error }) => {
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
  },
});

export const { changeCategory, setLastPosition } = communitySlice.actions;
export default communitySlice.reducer;
