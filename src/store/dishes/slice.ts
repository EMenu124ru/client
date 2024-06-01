import { createSlice } from "@reduxjs/toolkit";

import { dishAdapter, initialState } from "./state";

export const dishSlice = createSlice({
    name: "dishes",
    initialState: {
        ...dishAdapter.getInitialState(),
        ...initialState,
    },
    reducers: {
        cleanDishesErrors(state) {
            state.error = "";
        },
    },
});

export const { cleanDishesErrors } = dishSlice.actions;
