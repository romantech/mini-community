import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_HOST;
if (baseURL) axios.defaults.baseURL = baseURL;
else console.error('[env] VITE_HOST is missing');

export const getPosts = createAsyncThunk(
  'community/getPosts',
  async ({ page, limit = 7 }: { page: number; limit?: number }) => {
    const { data } = await axios.get<Post[]>(
      `/posts?_page=${page}&_limit=${limit}`,
    );
    return data;
  },
);

export const getPostById = createAsyncThunk(
  'community/getPostById',
  async ({ id }: Record<'id', number>) => {
    const { data } = await axios.get<Post>(`/posts?id=${id}`);
    return data;
  },
);

export const getCategories = createAsyncThunk(
  'community/getCategories',
  async () => {
    const { data } = await axios.get<Category[]>('/categories');
    return data;
  },
);

export const patchPostData = createAsyncThunk(
  'community/patchPostData',
  async ({ id, ...payload }: Partial<Post>) => {
    const { data } = await axios.patch<Post>(`/posts/${id}`, { ...payload });
    return data;
  },
);

export const submitDraft = createAsyncThunk(
  'community/submitDraft',
  async (payload: Draft) => {
    const addDate = { ...payload, writtenAt: new Date().toISOString() }; // new Date().toJSON()
    const { data } = await axios.post<Post>(`/posts`, addDate);
    return data;
  },
);
