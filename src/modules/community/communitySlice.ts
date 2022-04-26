import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './communityThunk';

interface CommunityState {
  list: Post[];
  loading: boolean;
  error: Error | null;
  compose: NewPost | null;
  lastSeen: {
    category: CategoryCode;
    location: number | null;
  };
}

const initialState: CommunityState = {
  list: [],
  loading: false,
  error: null,
  compose: null,
  lastSeen: {
    category: 'ALL',
    location: null,
  },
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
      state.list = payload;
    },
    [getPosts.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
  },
});

export default communitySlice.reducer;
