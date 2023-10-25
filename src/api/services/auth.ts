/* eslint-disable @typescript-eslint/naming-convention */

import $api from '@api/http';
import { AuthResponse } from '@models/authResponse';
import { AuthDto } from '@api/dtos/authDto';
import { AuthMapper } from '@api/mappers/authMapper';
import { RegisterArguments } from '@models/registerArguments';
import { LoginArguments } from '@models/loginArguments';
import { TokenService } from '@api/services/token';

export namespace AuthService {

  /**
   * Login user.
   * @param phoneNumber User phone number.
   * @param password Password.
   */
  export function login({ phoneNumber, password }: LoginArguments): Promise<AuthResponse> {
    return $api.post<AuthDto>(
      'clients/login',
      {
        phone_number: phoneNumber,
        password,
      },
    )
      .then(response => {
        const { accessToken, refreshToken } = AuthMapper.fromDto(response.data);
        TokenService.saveToken({ accessToken, refreshToken });
        return { accessToken, refreshToken };
      });
  }

  /**
   * Register user.
   * @param phoneNumber User phone number.
   * @param password Password.
   * @param firstName First name.
   * @param secondName Second name.
   */
  export function register({ phoneNumber, password, firstName, secondName }: RegisterArguments): Promise<AuthResponse> {
    return $api.post<AuthDto>(
      'clients',
      {
        phone_number: phoneNumber,
        password,
        first_name: firstName,
        last_name: secondName,
      },
    )
      .then(response => {
        const { accessToken, refreshToken } = AuthMapper.fromDto(response.data);
        TokenService.saveToken({ accessToken, refreshToken });
        return { accessToken, refreshToken };
      });
  }

  /**
   * TODO finish logout method.
   * Logout from system.
   */
  export function logout(): void {
    $api.post(
      'clients/logout',
    )
      .then(response => AuthMapper.fromDto(response.data));
  }

}
