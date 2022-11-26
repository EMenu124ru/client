/**
 * Dish DTO.
 */
export interface DishDto {

  /** Identification number of dish category. */
  readonly 'category': number;

  /** Title of dish. */
  readonly 'name': 'string';

  /** Description for dish. */
  readonly 'description': 'string';

  /** Short description. */
  readonly 'short_description': 'string';

  /** Dish price. */
  readonly 'price': number;

  /** Dish ingredients. */
  readonly 'compound': 'string';

  /** Weight of dish. */
  readonly 'weight': number;

  /** Dish images. */
  readonly 'images': readonly string[];
}
