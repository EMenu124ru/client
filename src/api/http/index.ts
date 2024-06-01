import type { AuthDto } from "@api/dtos/authDto";
import { AuthMapper } from "@api/mappers/authMapper";
import axios from "axios";

export const API_URL = import.meta.env.VITE_APP_BASE_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/api/v1`,
});

/**
 * Register user.
 */
export async function refresh() {
    const response = await axios.post<AuthDto>(
        `${API_URL}/api/v1/clients/refresh`,
        {},
        { withCredentials: true },
    );
    return AuthMapper.fromDto(response.data);
}

// Set auth interceptors.
$api.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {};
    }
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // eslint-disable-next-line no-underscore-dangle
        if (error.response.status === 401 && !originalRequest._retry) {
            await refresh();
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
        }
        return Promise.reject(error);
    },
);

export default $api;
