/**
 * Auth state.
 */
export interface AuthState {

  /** Is user authenticated. */
  readonly isAuth: boolean;

  /** Loading state. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;
}

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
};
