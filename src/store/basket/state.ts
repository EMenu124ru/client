import { StorageService } from '@lib/storage';
import { Dish } from '@models/dish';

/**
 * Basket dish state.
 */
export interface BasketDish extends Dish {

  /** Product quantity. */
  quantity: number;
}

/**
 * Basket state.
 */
export interface BasketState {

  /** Loading state. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;

  /** Basket content. */
  readonly basket: Record<number, BasketDish>;
}

export const initialState: BasketState = {
  isLoading: false,
  basket: StorageService.get<Record<number, BasketDish>>('basket') ?? {},
};
