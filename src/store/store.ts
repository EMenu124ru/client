import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@store/auth/api";
import { basketSlice } from "@store/basket/slice";
import { categoriesApi } from "@store/dishCategories/api";
import { dishesApi } from "@store/dishes/api";
import { dishSlice } from "@store/dishes/slice";
import { reservationApi } from "@store/reservation/api";
import { restaurantsApi } from "@store/restaurants/api";
import { restaurantsSlice } from "@store/restaurants/slice";
import {
    TypedUseSelectorHook, useDispatch, useSelector,
} from "react-redux";

import { authSlice } from "./auth/slice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [dishesApi.reducerPath]: dishesApi.reducer,
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        auth: authSlice.reducer,
        basket: basketSlice.reducer,
        dishes: dishSlice.reducer,
        restaurants: restaurantsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(authApi.middleware, dishesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
