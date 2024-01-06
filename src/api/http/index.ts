import axios from 'axios';
import { AuthDto } from '@api/dtos/authDto';
import { AuthMapper } from '@api/mappers/authMapper';

export const API_URL = import.meta.env.VITE_APP_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api/v1`,
});

/**
 * Register user.
 */
export async function refresh() {
  const response = await axios.post<AuthDto>(`${API_URL}/api/v1/clients/refresh`, {}, { withCredentials: true });
  return AuthMapper.fromDto(response.data);
}

// Set auth interceptors.
$api.interceptors.request.use(config => {
  if (!config.headers) {
    config.headers = {};
  }
  return config;
});

$api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    await refresh();
    originalRequest._retry = true;
  }
  return Promise.reject(error);
});

export default $api;
