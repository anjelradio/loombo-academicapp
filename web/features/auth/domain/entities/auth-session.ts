import type { AuthUser } from "./auth-user";

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};
