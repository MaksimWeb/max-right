import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  accessToken: string;
  loading: AuthStates;
  error: SerializedError | null;
}

const internalInitialState: AuthSliceState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(
      state: AuthSliceState,
      action: PayloadAction<{ token: string }>
    ) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {},
});

export const { updateAccessToken, reset } = actions;

export default reducer;
