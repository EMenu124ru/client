import { baseQueryWithReauth } from "@lib/baseQueryWithReauth";
import { DishCategoryResponse } from "@models/dishCategory";
import { createApi } from "@reduxjs/toolkit/query/react";
import { objectToCamel } from "ts-case-convert";

export const categoriesApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: "categoriesApi",
    tagTypes: ["Categories"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getDishesCategories: builder.query<DishCategoryResponse, void>({
            providesTags: () => ["Categories"],
            query: () => ({
                url: "categories",
                method: "GET",
                credentials: "include",
            }),
            // eslint-disable-next-line max-len
            transformResponse: (baseQueryReturnValue: object) => objectToCamel(baseQueryReturnValue) as DishCategoryResponse
        }),
    })
});

export const { useGetDishesCategoriesQuery } = categoriesApi;
