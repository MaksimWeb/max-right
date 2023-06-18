import { createSlice } from '@reduxjs/toolkit';
import { IImage } from '../post';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  image: IImage;
  name: string;
  accessToken?: string;
}

interface InitState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: InitState = {
  user: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: IUser }) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = actions;

export default reducer;
