interface Icon {
    file: string
    filename: string
}

/**
 * Category.
 */
export interface DishCategory {

  /** Identification number. */
  readonly id: number;

  /** Category path. */
  readonly name: string;

  readonly icon: Icon
}

export type DishCategoryResponse = DishCategory[];
