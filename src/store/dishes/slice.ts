import { createSlice } from '@reduxjs/toolkit';

import { dishAdapter, initialState } from './state';
import { getAllDishes } from './dispatchers';

export const authSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAllDishes.pending, state => {
      state.isLoading = true;

      state.error = undefined;
    })
    .addCase(getAllDishes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      dishAdapter.setAll(dishAdapter.getInitialState(), action.payload);
    })
    .addCase(getAllDishes.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
  ,

});
