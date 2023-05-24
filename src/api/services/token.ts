import { AuthResponse } from '@models/authResponse';
import { StorageService } from './storage';

const TOKEN_KEY = 'TOKENS';
export namespace TokenService {

  /** Get token from local storage. */
  export function getTokens(): AuthResponse | null {
    const accessToken = StorageService.get<string>('access_token') ?? undefined;
    const refreshToken = StorageService.get<string>('refresh_token') ?? undefined;
    if (!accessToken || !refreshToken) {
      return null;
    }
    return { accessToken, refreshToken };
  }

  /**
   * Save token to local storage.
   * @param tokens Tokens.
   */
  export function saveToken(tokens: AuthResponse): void {
    StorageService.set('refresh_token', tokens.refreshToken);
    StorageService.set('access_token', tokens.refreshToken);
  }

  /** Destroy token from local storage. */
  export function destroyToken(): void {
    return StorageService.remove(TOKEN_KEY);
  }

  /** Check whether the storage have token or not. */
  export function hasToken(): boolean {
    return getTokens() !== null;
  }
}
