import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCategories,
  getPosts,
  getPostsById,
  patchPostData,
  submitNewPost,
} from './communityThunk';

interface CommunityState {
  posts: Post[];
  selectedPost: Post | null;
  likedPostId: Array<Post['id']>;
  newPost: Partial<NewPost>;
  categories: Category[];
  currentCategoryId: CategoryId;
  lastPosition: number | null; // 리스트에서 포스트를 클릭했을 때의 스크롤
  loading: boolean;
  error: Error | null;
}

export const fixedCategories: Category[] = [
  { categoryId: 888, categoryCode: 'ALL', categoryName: '전체' },
  { categoryId: 999, categoryCode: 'POPULAR', categoryName: '⭐ 인기글' },
];

const initialNewPost: Partial<NewPost> = {
  categoryId: 1,
  categoryName: '대선청원',
  title: '',
  content: '',
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  imageUrl: null,
  writtenAt: '',
  writerNickName: '카우보이',
  writerProfileUrl: '',
};

const initialState: CommunityState = {
  posts: [],
  likedPostId: [],
  selectedPost: null,
  newPost: initialNewPost,
  categories: [],
  currentCategoryId: 888, // 전체글 (초기값)
  lastPosition: null,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    changeCategory: (state, { payload }: PayloadAction<CategoryId>) => {
      state.currentCategoryId = payload;
    },
    setLastPosition: (state, { payload }: PayloadAction<number>) => {
      state.lastPosition = payload;
    },
    addLikedPost: (state, { payload }: PayloadAction<Post['id']>) => {
      state.likedPostId.push(payload);
      if (state.selectedPost) state.selectedPost.likeCount += 1;
    },
    removeLikedPost: (state, { payload }: PayloadAction<Post['id']>) => {
      state.likedPostId = state.likedPostId.filter(id => id !== payload);
      if (state.selectedPost) state.selectedPost.likeCount -= 1;
    },
    setNewPost: (state, { payload }: PayloadAction<Partial<NewPost>>) => {
      state.newPost = { ...state.newPost, ...payload };
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
    clearNewPost: state => {
      state.newPost = initialState.newPost;
    },
  },
  // extraReducer 는 액션을 자동으로 생성하지 않음
  // createAsyncThunk 같은 별도 액션이 존재하는 함수의 reducer 를 정의할 때 유용
  extraReducers: {
    // 전체 포스트 목록 GET
    [getPosts.pending.type]: state => {
      state.loading = true;
    },
    [getPosts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts = payload.reverse(); // 최신글 먼저
    },
    [getPosts.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },

    // 1개 포스트 정보 GET
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

    // 카테고리 목록 GET
    [getCategories.pending.type]: state => {
      state.loading = true;
    },
    [getCategories.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.categories = [...fixedCategories, ...payload];
    },
    [getCategories.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },

    // 포스트 인터렉션 데이터 업데이트 PATCH
    [patchPostData.pending.type]: state => {
      state.loading = true;
    },
    [patchPostData.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.selectedPost = payload; // 로컬&원격이랑 데이터가 다를 수도 있으므로 한 번 더 덮어쓰기
    },
    [patchPostData.rejected.type]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },

    // 작성한 포스트 제출
    [submitNewPost.pending.type]: state => {
      state.loading = true;
    },
    [submitNewPost.fulfilled.type]: state => {
      state.loading = false;
      state.error = null;
    },
    [submitNewPost.rejected.type]: (state, { error }) => {
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
  setNewPost,
  clearSelectedPost,
  clearNewPost,
} = communitySlice.actions;
export default communitySlice.reducer;
