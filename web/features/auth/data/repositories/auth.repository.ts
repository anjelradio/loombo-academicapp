import { authApi } from "../api/auth-api";

export const authRepository = {
  login(data: unknown) {
    return authApi.login(data);
  },

  register(data: unknown) {
    return authApi.register(data);
  },
};
