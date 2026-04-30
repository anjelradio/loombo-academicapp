import type { AuthUser } from "../../../domain/entities/auth-user";
import type { AuthUserResponseDto } from "../../schemas/auth";

export function toAuthUserEntity(dto: AuthUserResponseDto): AuthUser {
  return {
    id: dto.id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    email: dto.email,
    isSuperAdmin: dto.is_super_admin,
  };
}
