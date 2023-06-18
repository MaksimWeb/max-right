import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './actions';

export interface IImage {
  src: string;
  alt: string;
}

interface Post {
  _id: string;
  title: string;
  author: string;
  text: string;
  image: IImage;
}

interface InitialState {
  posts: Post[];
}

const initialState: InitialState = {
  posts: [],
};

const { reducer } = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default reducer;
