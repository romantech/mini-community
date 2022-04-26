import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './communityThunk';

interface CommunityState {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  newPost: NewPost | null;
  category: Category['categoryPk'];
  lastSeen: number | null;
}

const initialState: CommunityState = {
  posts: [],
  loading: false,
  error: null,
  newPost: null,
  category: 0, // 전체
  lastSeen: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},
  // extraReducer 는 액션을 자동으로 생성하지 않음
  // createAsyncThunk 같은 별도 액션이 존재하는 함수의 reducer 를 정의할 때 유용
  extraReducers: {
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
  },
});

export default communitySlice.reducer;
