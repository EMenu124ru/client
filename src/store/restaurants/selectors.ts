import { RootState } from "@store/index";
import { restaurantsAdapter } from "@store/restaurants/state";

export const {
    selectById: selectRestaurantById,
    selectIds: selectRestaurantIds,
    selectEntities: selectRestaurantEntities,
    selectAll: selectAllRestaurants,
    selectTotal: selectTotalRestaurants,
} = restaurantsAdapter.getSelectors((state: RootState) => state.restaurants);
