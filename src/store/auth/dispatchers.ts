import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@api/services/auth';
import { AuthResponse } from '@models/authResponse';
import { LoginArguments } from '@models/loginArguments';
import { RegisterArguments } from '@models/registerArguments';
import { refresh } from '@api/http';

export const login = createAsyncThunk<AuthResponse, LoginArguments>(
  'auth/login',
  ({ phoneNumber, password }) => AuthService.login({ phoneNumber, password }),
);

export const register = createAsyncThunk<AuthResponse, RegisterArguments>(
  'auth/register',
  ({ phoneNumber, password, secondName, firstName }) => AuthService.register({ phoneNumber, password, secondName, firstName }),
);

export const refreshTokens = createAsyncThunk<AuthResponse>(
  'auth/refresh',
  () => refresh(),
);
