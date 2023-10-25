import { DishImage } from '@models/dishImage';
import { DishCategory } from '@models/dishCategory';

/**
 * Image.
 */
export interface Dish {

  /** Identification number. */
  readonly id: number;

  /** Dish category. */
  readonly 'category': DishCategory;

  /** Title of dish. */
  readonly 'title': string;

  /** Description for dish. */
  readonly 'description': string;

  /** Short description. */
  readonly 'shortDescription': string;

  /** Price. */
  readonly 'price': number;

  /** Ingredients. */
  readonly 'compound': string;

  /** Weight of dish. */
  readonly 'weight': number;

  /** Image images. */
  readonly 'images': DishImage[];
}
