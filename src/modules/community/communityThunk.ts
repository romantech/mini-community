import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

export const getPosts = createAsyncThunk('community/getPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const getPostsById = createAsyncThunk(
  'community/getPostById',
  async ({ id }: { id: Post['id'] }) => {
    const { data } = await axios.get(`/posts?id=${id}`);
    return data;
  },
);

export const getCategories = createAsyncThunk(
  'community/getCategories',
  async () => {
    const { data } = await axios.get('/categories');
    return data;
  },
);

export const patchPostData = createAsyncThunk(
  'community/patchPostData',
  async ({
    id,
    likeCount,
  }: {
    id: Post['id'];
    likeCount: Post['likeCount'];
  }) => {
    const { data } = await axios.patch(`/posts/${id}`, { likeCount });
    return data;
  },
);

export const submitNewPost = createAsyncThunk(
  'community/submitNewPost',
  async (payload: Partial<NewPost>) => {
    const addDatedPayload = { ...payload, writtenAt: new Date().toISOString() };
    const { data } = await axios.post(`/posts`, addDatedPayload);
    return data;
  },
);
