import type { AuthSession } from "../../types/auth.types";
import type { LoginResponseDto } from "../../schemas/auth";
import { toAuthUserEntity } from "./auth-user.mapper";

export function toAuthSessionEntity(dto: LoginResponseDto): AuthSession {
  return {
    accessToken: dto.access_token,
    user: toAuthUserEntity(dto.user),
  };
}
