import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@api/services/auth';
import { AuthResponse } from '@models/authResponse';
import { LoginArguments } from '@models/loginArguments';
import { RegisterArguments } from '@models/registerArguments';
import { refresh } from '@api/http';
import { RootState } from '@store/index';

export const login = createAsyncThunk<AuthResponse, LoginArguments>(
  'auth/login',
  ({ phoneNumber, password }) => AuthService.login({ phoneNumber, password }),
  {
    condition(_: LoginArguments, { getState }) {
      const { auth } = getState() as RootState;

      // Need to avoid typescript error
      if (auth.isLoading) {
        return false;
      }
      return true;
    },
  },
);

export const register = createAsyncThunk<AuthResponse, RegisterArguments>(
  'auth/register',
  ({ phoneNumber, password, secondName, firstName }) =>
    AuthService.register({ phoneNumber, password, secondName, firstName }),
  {
    condition(
      _: RegisterArguments,
      { getState },
    ) {
      const { auth } = getState() as RootState;

      // Need to avoid typescript
      if (auth.isLoading) {
        return false;
      }
      return true;
    },
  },
);

export const refreshTokens = createAsyncThunk<AuthResponse, undefined>(
  'auth/refresh',
  () => refresh(),
  {
    condition(_, { getState }) {
      const { auth } = getState() as RootState;

      // Need to avoid typescript error
      if (auth.isRefreshLoading) {
        return false;
      }
      return true;
    },
  },
);
