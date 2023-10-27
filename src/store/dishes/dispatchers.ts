import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dish } from '@models/dish';
import { DishService } from '@api/services/dish';

export const getDishes = createAsyncThunk<Dish[]>(
  'dishes/get',
  () => DishService.getAll(),
);

export const getDish = createAsyncThunk<Dish, string>(
  'dish/get',
  id => DishService.get(id),
);
