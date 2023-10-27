import { AuthResponse } from '@models/authResponse';
import { AuthDto } from '@api/dtos/authDto';

export namespace AuthMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: AuthDto): AuthResponse {
    return ({
      accessToken: dto.access,
      refreshToken: dto.refresh,
    });
  }
}
