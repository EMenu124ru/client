import { Dish } from '@models/dish';
import { DishCategory } from '@models/dishCategory';
import { DishImage } from '@models/dishImage';

export const mockImage: DishImage = {
  image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixi' +
    'd=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
  id: 1,
};

export const mockDishCategory: DishCategory = {
  id: 1,
  name: 'fish',
};

export const mockDish: Dish = {
  id: 1,
  description: 'Нежный осьминог с молодыми тропическими фруктами',
  shortDescription: 'Нежный осьминог',
  title: 'Морской кошмар',
  weight: 100,
  compound: 'Lalala',
  price: 1100,
  category: mockDishCategory,
  images: [mockImage],
};