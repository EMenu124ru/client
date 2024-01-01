import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

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

export const selectRefreshAuthErrors = createSelector(
  (state: RootState) => state.auth.refreshError,
  error => error,
);

export const selectRefreshLoading = createSelector(
  (state: RootState) => state.auth.isRefreshLoading,
  loading => loading,
);
