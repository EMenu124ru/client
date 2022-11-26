import $api from '@api/http';
import { DishDto } from '@api/dtos/dishDto';
import { DishMapper } from '@api/mappers/dishMapper';
import { Dish } from '@models/dish';

export namespace DishService {

  /**
   * Get all dishes.
   */
  export function getAll(): Promise<Dish[]> {
    return $api.get<DishDto[]>('dishes')
      .then(response => response.data.map(dishDto => DishMapper.fromDto(dishDto)));
  }

  /**
   * Get certain dish.
   * @param id Dish id.
   */
  export function getOne(id: string): Promise<Dish> {
    return $api.get(`dishes/${id}`)
      .then(response => DishMapper.fromDto(response.data));
  }
}
