import { Restaurant } from "@models/restaurants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState, restaurantsAdapter } from "./state";

export const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: {
        ...restaurantsAdapter.getInitialState(),
        ...initialState,
    },
    reducers: {
        setRestaurants(state, { payload }: PayloadAction<Restaurant[]>) {
            restaurantsAdapter.setAll(state, payload);
        },
    },
});

export const { setRestaurants } = restaurantsSlice.actions;
