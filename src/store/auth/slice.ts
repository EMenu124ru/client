import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { login, refreshTokens, register } from './dispatchers';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuthErrors(state) {
      state.error = '';
    },
  },
  extraReducers: builder => builder
    .addCase(refreshTokens.fulfilled, state => {
      state.isRefreshLoading = false;
      state.isAuth = true;

      state.error = undefined;
    })
    .addCase(refreshTokens.rejected, state => {
      state.isAuth = false;
      state.isRefreshLoading = false;
    })
    .addCase(refreshTokens.pending, state => {
      state.isRefreshLoading = true;
      state.error = undefined;
    })
    .addCase(login.pending, state => {
      state.isLoading = true;

      state.error = undefined;
    })
    .addCase(login.fulfilled, state => {
      state.isLoading = false;
      state.isAuth = true;

      state.error = undefined;
    })
    .addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
    .addCase(register.pending, state => {
      state.isLoading = true;

      state.error = undefined;
    })
    .addCase(register.fulfilled, state => {
      state.isLoading = false;
      state.isAuth = true;

      state.error = undefined;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }),
});

export const { cleanAuthErrors } = authSlice.actions;
