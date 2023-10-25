import { DishImageDto } from '@api/dtos/dishImageDto';
import { CategoryDto } from '@api/dtos/categoryDto';

/**
 * Image DTO.
 */
export interface DishDto {

  /** Identification number. */
  readonly 'id': number;

  /** Identification number of dish category. */
  readonly 'category': CategoryDto;

  /** Title of dish. */
  readonly 'name': 'string';

  /** Description for dish. */
  readonly 'description': 'string';

  /** Short description. */
  readonly 'short_description': 'string';

  /** Image price. */
  readonly 'price': number;

  /** Image ingredients. */
  readonly 'compound': 'string';

  /** Weight of dish. */
  readonly 'weight': number;

  /** Image images. */
  readonly 'images': readonly DishImageDto[];
}
