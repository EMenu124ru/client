import { Dish } from '@models/dish';
import { createEntityAdapter } from '@reduxjs/toolkit';

/**
 * Image state.
 */
export interface DishState {

  /** Loading state. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;
}

export const dishAdapter = createEntityAdapter<Dish>({
  /**
   * Select by dish id.
   * @param dish Dish.
   */
  selectId: dish => dish.id,

  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const initialState: DishState = {
  isLoading: false,
};
