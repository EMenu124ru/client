import { AuthResponse } from '@models/authResponse';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@lib/constants';
import { StorageService } from './storage';

export namespace TokenService {

  /** Get token from local storage. */
  export function getTokens(): AuthResponse | null {
    const accessToken = StorageService.get<string>(ACCESS_TOKEN) ?? undefined;
    const refreshToken = StorageService.get<string>(REFRESH_TOKEN) ?? undefined;
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
    StorageService.set(ACCESS_TOKEN, tokens.refreshToken);
    StorageService.set(REFRESH_TOKEN, tokens.refreshToken);
  }

  /** Destroy token from local storage. */
  export function destroyTokens(): void {
    StorageService.remove(ACCESS_TOKEN);
    StorageService.remove(REFRESH_TOKEN);
  }

  /** Check whether the storage have token or not. */
  export function hasToken(): boolean {
    console.log(document.cookie);
    return getTokens() !== null;
  }
}
