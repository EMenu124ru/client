import axios from 'axios';
import { AuthResponse } from '@models/authResponse';
import { AuthDto } from '@api/dtos/authDto';
import { AuthMapper } from '@api/mappers/authMapper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@lib/constants';
import { TokenService } from '@lib/token';

export const API_URL = import.meta.env.VITE_APP_BASE_URL;

const $api = axios.create({
  // withCredentials: true,
  baseURL: `${API_URL}/api/v1`,
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
  config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
  return config;
});

$api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const tokens = TokenService.getTokens();
    if (tokens) {
      const { refreshToken } = tokens;
      const { accessToken, refreshToken: newRefreshToken } = await refresh(refreshToken);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
      $api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return $api(originalRequest);
    }
  }
  TokenService.destroyTokens();
  return Promise.reject(error);
});

export default $api;
