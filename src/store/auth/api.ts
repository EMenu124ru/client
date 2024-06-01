import { baseQueryWithReauth } from "@lib/baseQueryWithReauth";
import {
    AuthResponse, LoginRequest, SignupRequest, User
} from "@models/auth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { login, logout } from "@store/auth/slice";
import { objectToCamel, objectToSnake } from "ts-case-convert/lib/caseConvert";

export const authApi = createApi({
    baseQuery: baseQueryWithReauth,
    keepUnusedDataFor: 0,
    reducerPath: "authApi",
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: "clients/login",
                method: "POST",
                credentials: "include",
                body: objectToSnake(body),
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(login());
                } catch (e) {
                    dispatch(logout());
                }
            }
        }),
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (body) => ({
                url: "clients",
                method: "POST",
                credentials: "include",
                body: objectToSnake(body),
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(login());
                } catch (e) {
                    dispatch(logout());
                }
            },
        }),
        getMe: builder.query<User, void>({
            query: () => ({
                url: "clients/me",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(login());
                } catch (e) {
                    dispatch(logout());
                }
            },
            transformResponse: (baseQueryReturnValue: object) => objectToCamel(baseQueryReturnValue) as User
        }),

    })
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery } = authApi;
