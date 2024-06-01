/**
 * Auth state.
 */
export interface AuthState {

  /** Is user authenticated. */
  readonly isAuth: boolean;

}

export const initialState: AuthState = {
    isAuth: false,
};
