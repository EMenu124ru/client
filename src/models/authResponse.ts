/**
 * Auth response class.
 */
export interface AuthResponse {

  /** Access token. */
  readonly accessToken: string;

  /** Refresh token. */
  readonly refreshToken: string;
}
