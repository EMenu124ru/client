import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

export const selectIsAuth = createSelector(
    (state: RootState) => state.auth.isAuth,
    (isAuth) => isAuth,
);
