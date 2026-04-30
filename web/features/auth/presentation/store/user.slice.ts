import type { AuthUser } from "@/features/auth/domain/entities/auth-user";
import type { StateCreator } from "zustand";

export interface UserSlice {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
});
