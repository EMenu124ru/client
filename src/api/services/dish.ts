import $api from '@api/http';
import { DishDto } from '@api/dtos/dishDto';
import { DishMapper } from '@api/mappers/dishMapper';
import { Dish } from '@models/dish';

interface GetDishesResponse {

  /** Result length. */
  count: number;

  /** Page links. */
  links: {

    /** Next page. */
    next: string;

    /** Previous page. */
    previous: string;
  };

  /** Total pages. */
  total_pages: number;

  /** Results. */
  results: DishDto[];
}

export namespace DishService {

  /**
   * Get all dishes.
   */
  export function getAll(): Promise<Dish[]> {
    return $api.get<GetDishesResponse>('dishes')
      .then(response => response)
      .then(response => response.data.results.map(dishDto => DishMapper.fromDto(dishDto)));
  }

  /**
   * Get certain dish.
   * @param id Image id.
   */
  export function get(id: string): Promise<Dish> {
    return $api.get(`dishes/${id}`)
      .then(response => DishMapper.fromDto(response.data));
  }
}
