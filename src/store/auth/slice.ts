import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { login, register } from './dispatchers';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
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
    })
  ,

});
