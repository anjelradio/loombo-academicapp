import type { AuthSession } from "../../../../domain/entities/auth-session";
import type { z } from "zod";
import { LoginResponseSchema } from "../../../schemas/auth/response";
import { toAuthUserEntity } from "./auth-user.mapper";

export function toAuthSessionEntity(dto: z.infer<typeof LoginResponseSchema>): AuthSession {
  return {
    accessToken: dto.access_token,
    user: toAuthUserEntity(dto.user),
  };
}
