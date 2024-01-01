import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dish } from '@models/dish';
import { DishService } from '@api/services/dish';
import { RootState } from '@store/index';

export const getDishes = createAsyncThunk<Dish[]>('dishes/get', () =>
  DishService.getAll());

export const getDish = createAsyncThunk<Dish, string>(
  'dish/get',
  id => DishService.get(id),
  {
    condition(_: string, { getState }) {
      const { auth } = getState() as RootState;

      // Need to avoid typescript error
      if (auth.isLoading) {
        return false;
      }
      return true;
    },
  },
);
