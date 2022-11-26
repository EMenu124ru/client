/* eslint-disable jsdoc/require-jsdoc */
import { Dish } from '@models/dish';
import { createEntityAdapter } from '@reduxjs/toolkit';

/**
 * Dish state.
 */
export interface DishState {

  /** Loading state. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;
}

export const dishAdapter = createEntityAdapter<Dish>({
  selectId: dish => dish.title,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const initialState: DishState = dishAdapter.getInitialState<DishState>({
  isLoading: false,
});
