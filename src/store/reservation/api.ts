import { baseQueryWithReauth } from "@lib/baseQueryWithReauth";
import { Dish } from "@models/dish";
import { MakeReservationRequest } from "@models/reservation";
import { createApi } from "@reduxjs/toolkit/query/react";
import { clearBasket } from "@store/basket/slice";
import { objectToCamel, objectToSnake } from "ts-case-convert";

export const reservationApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: "reservationApi",
    tagTypes: ["Dishes", "Category"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        makeReservation: builder.mutation<void, MakeReservationRequest>({
            query: (request) => ({
                url: "reservations",
                body: objectToSnake(request),
                method: "POST",
                credentials: "include",
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(clearBasket());
                } catch (e) { /* empty */ }
            }
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

export const { useMakeReservationMutation } = reservationApi;
