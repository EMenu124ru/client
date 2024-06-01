/**
 * Auth response class.
 */
export interface AuthResponse {

  /** Access token. */
  readonly accessToken: string;

  /** Refresh token. */
  readonly refreshToken: string;
}

/**
 * Needed arguments to authentication.
 */
export interface LoginRequest {

  /** Phone number. */
  readonly phoneNumber: string;

  /** Password. */
  readonly password: string;
}

/**
 * Needed arguments to authentication.
 */
export interface SignupRequest {

  /** Phone number. */
  readonly phoneNumber: string;

  /** Password. */
  readonly password: string;

  /** Second name. */
  readonly lastName: string;

  /** First name. */
  readonly firstName: string;
}

export interface User {
  id: number
  firstName: string
  lastName: number
  surname: number
  bonuses: number
  phoneNumber: number
}
