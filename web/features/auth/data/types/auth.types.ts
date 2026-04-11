import type { AuthUser } from "../../domain/entities/auth-user";

export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      errors: string[];
    };

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type AuthResult = Result<AuthSession>;
export type AuthActionResult = Result<AuthUser>;
