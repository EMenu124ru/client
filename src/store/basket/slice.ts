import { Dish } from "@models/dish";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./state";

interface UpdateDishQuantityPayload {
  dishId: number;
}

interface AddDishPayload {
  dish: Dish;
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        clearBasket(state) {
            state.basket = {};
        },
        decrementDishQuantity(state, { payload }: PayloadAction<UpdateDishQuantityPayload>) {
            const { dishId } = payload;
            const basketDish = state.basket[dishId];

            if (state.basket[dishId].quantity === 1) {
                delete state.basket[dishId];
            } else {
                basketDish.quantity -= 1;
            }
        },
        incrementDishQuantity(state, { payload }: PayloadAction<UpdateDishQuantityPayload>) {
            const { dishId } = payload;
            if (!state.basket[dishId]) {
                state.basket[dishId].quantity = 1;
            }
            state.basket[dishId].quantity += 1;
        },
        addDishToBasket(state, { payload }: PayloadAction<AddDishPayload>) {
            const { dish } = payload;
            state.basket[dish.id] = {
                ...dish,
                quantity: 1,
            };
        },
    },
    extraReducers: (builder) => builder,
});

export const {
    decrementDishQuantity,
    incrementDishQuantity,
    addDishToBasket,
    clearBasket
} = basketSlice.actions;
