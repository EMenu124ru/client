import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dish } from '@models/dish';
import { DishService } from '@api/services/dish';

export const getAllDishes = createAsyncThunk<Dish[]>(
  'dish/getAll',
  () => DishService.getAll(),
);

export const getOneDish = createAsyncThunk<Dish, string>(
  'dish/getOne',
  id => DishService.getOne(id),
);
