import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.isAuth,
  isAuth => isAuth,
);

export const selectAuthErrors = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);
