import { RootState } from "../store";

export const selectBasket = (state: RootState) => state.basket.basket;
