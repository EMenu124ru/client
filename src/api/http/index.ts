import axios from 'axios';
import { AuthResponse } from '@models/authResponse';
import { AuthDto } from '@api/dtos/authDto';
import { AuthMapper } from '@api/mappers/authMapper';

export const API_URL = process.env.REACT_APP_BASE_URL;

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

/**
 * Register user.
 * @param refreshToken Refresh token.
 */
export function refresh(refreshToken: string): Promise<AuthResponse> {
  return $api.post<AuthDto>(
    'clients/refresh',
    {
      refresh: refreshToken,
    },
  )
    .then(response => AuthMapper.fromDto(response.data));
}

// Set auth interceptors.
$api.interceptors.request.use(config => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.request.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const { accessToken, refreshToken: newRefreshToken } = await refresh(refreshToken);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      $api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return $api(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default $api;
