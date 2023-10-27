import { createSelector } from '@reduxjs/toolkit';
import { selectAllDishes } from '@store/dishes/selectors';
import { RootState } from '../store';

export const selectBasket = (state: RootState) => state.basket.basket;

export const selectChosenDishes = createSelector(
  (state: RootState) => state.basket.basket,
  (state: RootState) => selectAllDishes(state),
  (basket, dishes) => dishes.filter(dish => basket[dish.id] !== undefined),
);

export const selectAuthErrors = createSelector(
  (state: RootState) => selectAllDishes(state),
  error => error,
);
