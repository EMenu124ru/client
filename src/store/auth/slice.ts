import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
        login: (state) => {
            state.isAuth = true;
        },
    },
});

export const { logout, login } = authSlice.actions;
