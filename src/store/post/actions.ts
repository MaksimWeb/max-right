import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('localhost:3000/posts');

      return await res.json();
    } catch {
      return rejectWithValue('Sorry, cant load posts list');
    }
  }
);

export const addPost = createAsyncThunk<
  any,
  { post: { title: string; text: string } }
>('posts/addPost', async ({ post }, { rejectWithValue }) => {
  axios.post('localhost:3000/posts', post);
});
