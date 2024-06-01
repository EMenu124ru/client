import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { login, logout } from "@store/auth/slice";
import { Mutex } from "async-mutex";

const API_URL = import.meta.env.VITE_APP_BASE_URL;
const API_VERSION = import.meta.env.VITE_APP_VERSION_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/api/${API_VERSION}`,
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // try to get a new token
                const refreshResult = await baseQuery({
                    url: "auth/token/refresh",
                    method: "POST",
                    credentials: "include"
                }, api, extraOptions);
                if (refreshResult.error) {
                    api.dispatch(logout());
                } else if (refreshResult.data) {
                    api.dispatch(login());
                    // store the new token
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else { /* empty */ }
            } catch (e) {
                api.dispatch(logout());
                throw new Error(e);
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    } else if (result.error) {
        return ({ error: result.error });
    }
    return result;
};
