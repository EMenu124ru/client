import { DishDto } from '@api/dtos/dishDto';
import { Dish } from '@models/dish';
import { DishImage } from '@models/dishImage';

export namespace DishMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: DishDto): Dish {
    return ({
      id: dto.id,
      description: dto.description,
      shortDescription: dto.short_description,
      images: dto.images.map(image => ({ image: image.image, id: image.id } as DishImage)),
      category: dto.category,
      compound: dto.compound,
      price: dto.price,
      weight: dto.weight,
      title: dto.name,
    });
  }
}
