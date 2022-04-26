import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories, getPosts } from './communityThunk';

interface CommunityState {
  posts: Post[];
  categories: Category[];
  newPost: NewPost | null;
  currentCategory: Category['categoryPk'];
  lastSeen: number | null;
  loading: boolean;
  error: Error | null;
}

const initialState: CommunityState = {
  posts: [],
  categories: [],
  newPost: null,
  currentCategory: 0, // 전체
  lastSeen: null,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
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
    // 카테고리 목록
    [getCategories.pending.type]: state => {
      state.loading = true;
    },
    [getCategories.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.categories = [
        { categoryPk: 0, categoryCode: 'ALL', categoryName: '전체' },
        ...payload,
      ];
    },
    [getCategories.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
  },
});

export const { changeCategory } = communitySlice.actions;
export default communitySlice.reducer;
