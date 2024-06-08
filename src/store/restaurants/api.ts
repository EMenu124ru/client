import { baseQueryWithReauth } from "@lib/baseQueryWithReauth";
import {
    GetPlacesTagsResponse,
    GetRestaurantPlacesRequest,
    GetRestaurantPlacesResponse,
    GetRestaurantsResponse
} from "@models/restaurants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { objectToCamel, objectToSnake } from "ts-case-convert";

export const restaurantsApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: "restaurantsApi",
    tagTypes: ["Restaurants", "RestaurantsPlaces", "PlacesTags"],
    endpoints: (builder) => ({
        getRestaurantPlaces: builder.query<GetRestaurantPlacesResponse, GetRestaurantPlacesRequest>({
            providesTags:
              (result, error, { tag }) => [{ type: "RestaurantsPlaces", id: tag }],
            query: ({ tag }) => ({
                url: "restaurants/places",
                method: "GET",
                credentials: "include",
                params: objectToSnake({
                    restaurantId: tag
                }),

            }),
            transformResponse: (baseQueryReturnValue: object) => {
                const response = objectToCamel(baseQueryReturnValue) as GetRestaurantPlacesResponse;
                response.busy = response.busy.map(objectToCamel);
                response.free = response.free.map(objectToCamel);
                response.reserved = response.reserved.map(objectToCamel);
                return response;
            }
        }),
        getRestaurantTags: builder.query<GetPlacesTagsResponse, GetRestaurantPlacesRequest>({
            providesTags: () => ["PlacesTags"],
            query: ({ tag }) => ({
                url: "restaurants/tags",
                params: objectToSnake({
                    restaurantId: tag
                }),
                method: "GET",
                credentials: "include",
            }),
        }),
        getRestaurants: builder.query<GetRestaurantsResponse, void>({
            providesTags: () => ["Restaurants"],
            query: () => ({
                url: "restaurants",
                method: "GET",
                credentials: "include",
            }),
            // eslint-disable-next-line max-len
            transformResponse: (baseQueryReturnValue: object) => {
                const response = objectToCamel(baseQueryReturnValue) as GetRestaurantsResponse;
                return response
                    .map((restaurant) => {
                        restaurant.schedule = restaurant.schedule.map((shed) => ({
                            ...shed,
                            timeFinish: new Date(shed.timeFinish),
                            timeStart: new Date(shed.timeStart)
                        }));
                        return restaurant;
                    });
            },
        }),
    })
});

export const { useGetRestaurantsQuery, useGetRestaurantPlacesQuery, useGetRestaurantTagsQuery } = restaurantsApi;
