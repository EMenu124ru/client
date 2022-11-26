import { DishDto } from '@api/dtos/dishDto';
import { Dish } from '@models/dish';

export namespace DishMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: DishDto): Dish {
    return ({
      description: dto.description,
      shortDescription: dto.short_description,
      images: dto.images,
      categoryId: dto.category,
      compound: dto.compound,
      price: dto.price,
      weight: dto.weight,
      title: dto.name,
    });
  }
}
