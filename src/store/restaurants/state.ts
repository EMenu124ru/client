import { Restaurant } from "@models/restaurants";
import { createEntityAdapter } from "@reduxjs/toolkit";

export interface DishState {

  readonly isLoading: boolean;

  readonly error?: string;
}

export const restaurantsAdapter = createEntityAdapter<Restaurant>({
    selectId: (restaurant) => restaurant.id,
    sortComparer: (a, b) => a.address.toLowerCase().localeCompare(b.address.toLowerCase()),
});

export const initialState: DishState = {
    isLoading: false,
};
