import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

export const getPosts = createAsyncThunk('community/getPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const newPost = createAsyncThunk('community/newPost', async () => {});
