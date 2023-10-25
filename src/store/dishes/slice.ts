import { createSlice } from '@reduxjs/toolkit';
import { dishAdapter, initialState } from './state';
import { getDishes } from './dispatchers';

export const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    ...dishAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder
    .addCase(getDishes.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(getDishes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      dishAdapter.addMany(state, action.payload);
    })
    .addCase(getDishes.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    }),
});
