import { createSelector } from '@reduxjs/toolkit';
import { dishAdapter } from '@store/dishes/state';
import { RootState } from '../store';

export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.isAuth,
  isAuth => isAuth,
);

export const selectDishesErrors = createSelector(
  (state: RootState) => state.dishes.error,
  error => error,
);

export const { selectAll: selectAllDishes } = dishAdapter.getSelectors<RootState>(state => state.dishes);
