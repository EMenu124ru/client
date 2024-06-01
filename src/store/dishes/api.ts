import { baseQueryWithReauth } from "@lib/baseQueryWithReauth";
import { Dish, GetCategoryDishesRequest, GetCategoryDishesResponse } from "@models/dish";
import { createApi } from "@reduxjs/toolkit/query/react";
import { objectToCamel, objectToSnake } from "ts-case-convert";

export const dishesApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: "dishesApi",
    tagTypes: ["Dishes", "Category"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getDishesByCategory: builder.query<GetCategoryDishesResponse, GetCategoryDishesRequest>({
            providesTags: (result, error, { categoryId },) => ["Dishes", { type: "Category", id: categoryId }],
            query: ({
                categoryId, page, pageSize, restaurantId
            }) => ({
                url: `categories/${categoryId}/dishes`,
                params: objectToSnake({
                    pageSize,
                    page,
                    restaurantId,
                }),
                method: "GET",
                credentials: "include",
            }),
            transformResponse:
              (baseQueryReturnValue: object) => objectToCamel(baseQueryReturnValue) as GetCategoryDishesResponse

        }),

        getDish: builder.query<Dish, { id: string }>({
            providesTags: (result, error, { id }) => ["Dishes", { type: "Dishes", id }],
            query: ({ id }) => ({
                url: `dishes/${id}`,
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (baseQueryReturnValue: object) => objectToCamel(baseQueryReturnValue) as Dish
        }),

    })
});

export const { useGetDishesByCategoryQuery } = dishesApi;
