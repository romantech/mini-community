import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import {
  getCategories,
  getPostById,
  getPosts,
  patchPostData,
  submitDraft,
} from './community.thunk';

interface CommunityState {
  posts: Post[];
  selectedPost: Post | null;
  likedPostId: Array<Post['id']>;
  page: number;
  morePage: boolean;
  draft: Draft;
  categories: Category[];
  currentCategoryId: CategoryId;
  lastPosition: number | null; // 리스트에서 포스트를 클릭했을 때의 스크롤
  loading: boolean;
  error: SerializedError | null;
}

export const fixedCategories: Category[] = [
  { categoryId: 888, categoryCode: 'ALL', categoryName: '전체' },
  { categoryId: 999, categoryCode: 'POPULAR', categoryName: '⭐ 인기글' },
];

const initialDraft: Draft = {
  categoryId: 1,
  categoryName: '테크',
  title: '',
  content: '',
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  imageUrl: null,
  writtenAt: null,
  writerNickName: '피그마',
  writerProfileUrl: '',
};

const initialState: CommunityState = {
  posts: [],
  selectedPost: null,
  likedPostId: [],
  page: 1,
  morePage: true,
  draft: initialDraft,
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
    setNextPage: state => {
      state.page += 1;
    },
    addLikedPost: (state, { payload }: PayloadAction<Post['id']>) => {
      state.likedPostId.push(payload);
      if (state.selectedPost) state.selectedPost.likeCount += 1;
    },
    removeLikedPost: (state, { payload }: PayloadAction<Post['id']>) => {
      state.likedPostId = state.likedPostId.filter(id => id !== payload);
      if (state.selectedPost) state.selectedPost.likeCount -= 1;
    },
    modifyDraft: (state, { payload }: PayloadAction<Draft>) => {
      state.draft = { ...state.draft, ...payload };
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
    clearDraft: state => {
      state.draft = initialState.draft;
    },
  },
  // extraReducer 는 액션을 자동으로 생성하지 않음
  // createAsyncThunk 같은 별도 액션이 존재하는 함수의 reducer 를 정의할 때 유용
  extraReducers: builder => {
    builder
      // 전체 포스트 목록 GET
      .addCase(getPosts.pending, state => {
        state.loading = true;
      })
      .addCase(
        getPosts.fulfilled,
        (state, { payload }: PayloadAction<Post[]>) => {
          state.loading = false;
          state.error = null;

          // 한 페이지당 7개씩 불러오므로 응답 데이터가 7개 미만이면 더이상 포스트 없음
          if (payload.length < 7) state.morePage = false;

          const deDuplicates = payload?.filter(post => {
            return state.posts.every(p => p.id !== post.id);
          });
          state.posts = [...state.posts, ...deDuplicates];
        },
      )
      .addCase(getPosts.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      })

      // 1개 포스트 정보 GET
      .addCase(getPostById.pending, state => {
        state.loading = true;
      })
      .addCase(
        getPostById.fulfilled,
        (state, { payload }: PayloadAction<Post[]>) => {
          state.loading = false;
          state.error = null;
          state.selectedPost = payload.at(0) ?? null;
        },
      )
      .addCase(getPostById.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      })

      // 카테고리 목록 GET
      .addCase(getCategories.pending, state => {
        state.loading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, { payload }: PayloadAction<Category[]>) => {
          state.loading = false;
          state.error = null;
          state.categories = [...fixedCategories, ...payload];
        },
      )
      .addCase(getCategories.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      })

      // 포스트 인터렉션 데이터 업데이트 PATCH
      .addCase(patchPostData.pending, () => {
        // state.loading = true; // 좋아요 및 조회수 데이터 변경시엔 로딩 스피너 안보이도록 설정
      })
      .addCase(
        patchPostData.fulfilled,
        (state, { payload }: PayloadAction<Post>) => {
          state.loading = false;
          state.error = null;
          const idx = state.posts.findIndex(post => post.id === payload.id);
          if (idx !== -1) state.posts[idx] = payload;
        },
      )
      .addCase(patchPostData.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      })

      // 작성한 포스트 제출
      .addCase(submitDraft.pending, state => {
        state.loading = true;
      })
      .addCase(
        submitDraft.fulfilled,
        (state, { payload }: PayloadAction<Post>) => {
          state.loading = false;
          state.error = null;
          state.posts = [payload, ...state.posts];
        },
      )
      .addCase(submitDraft.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      });
  },
});

export const {
  changeCategory,
  setLastPosition,
  setNextPage,
  addLikedPost,
  removeLikedPost,
  modifyDraft,
  clearSelectedPost,
  clearDraft,
} = communitySlice.actions;
export default communitySlice.reducer;
