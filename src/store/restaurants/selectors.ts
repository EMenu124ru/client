import { restaurantsAdapter } from "@store/restaurants/state";

import { RootState } from "@/store";

export const {
    selectById: selectRestaurantById,
    selectIds: selectRestaurantIds,
    selectEntities: selectRestaurantEntities,
    selectAll: selectAllRestaurants,
    selectTotal: selectTotalRestaurants,
} = restaurantsAdapter.getSelectors((state: RootState) => state.restaurants);
