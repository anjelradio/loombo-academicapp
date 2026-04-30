import type { AuthUser } from "../../domain/entities/auth-user";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type AuthResult = ApiResult<AuthSession>;
export type AuthActionResult = ApiResult<AuthUser>;
