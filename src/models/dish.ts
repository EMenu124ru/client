import { DishCategory } from "@models/dishCategory";
import { DishImage } from "@models/dishImage";

/**
 * Image.
 */
export interface Dish {

  /** Identification number. */
  readonly id: number;

  /** Dish category. */
  readonly "category": DishCategory;

  /** Title of dish. */
  readonly "name": string;

  /** Description for dish. */
  readonly "description": string;

  /** Short description. */
  readonly "shortDescription": string;

  /** Price. */
  readonly "price": number;

  /** Ingredients. */
  readonly "compound": string;

  /** Weight of dish. */
  readonly "weight": number;

  /** Image images. */
  readonly "images": DishImage[];
}

export interface GetCategoryDishesRequest {
  categoryId: number
  restaurantId: number
  page: number
  pageSize: number
}

export interface GetCategoryDishesResponse {
  count: number
  totalPages: number
  results: Dish[]
}
