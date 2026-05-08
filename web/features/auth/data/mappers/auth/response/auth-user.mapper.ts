import type { AuthUser } from "../../../../domain/entities/auth-user";
import type { z } from "zod";
import { AuthUserResponseSchema } from "../../../schemas/auth/response";

export function toAuthUserEntity(dto: z.infer<typeof AuthUserResponseSchema>): AuthUser {
  return {
    id: dto.id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    email: dto.email,
    isSuperAdmin: dto.is_super_admin,
  };
}
