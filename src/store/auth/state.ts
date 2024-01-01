import { TokenService } from '@lib/token';

/**
 * Auth state.
 */
export interface AuthState {

  /** Is user authenticated. */
  readonly isAuth: boolean;

  /** Loading state. */
  readonly isLoading: boolean;

  /** Refresh loading state. */
  readonly isRefreshLoading: boolean;

  /** Refresh errors. */
  readonly refreshError?: string;

  /** Error. */
  readonly error?: string;
}

export const initialState: AuthState = {
  isAuth: TokenService.hasToken(),
  isLoading: false,
  isRefreshLoading: false,
};
