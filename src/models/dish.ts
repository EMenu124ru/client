/**
 * Dish.
 */
export interface Dish {

  /** Identification number of dish category. */
  readonly 'categoryId': number;

  /** Title of dish. */
  readonly 'title': 'string';

  /** Description for dish. */
  readonly 'description': 'string';

  /** Short description. */
  readonly 'shortDescription': 'string';

  /** Dish price. */
  readonly 'price': number;

  /** Dish ingredients. */
  readonly 'compound': 'string';

  /** Weight of dish. */
  readonly 'weight': number;

  /** Dish images. */
  readonly 'images': readonly string[];
}
