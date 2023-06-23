import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auht/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        'api/login',
        credentials
      );

      return { accessToken: response.data.accessToken };
    } catch (e: any) {
      return rejectWithValue({ error: e.message });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>('api/logout');
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});
