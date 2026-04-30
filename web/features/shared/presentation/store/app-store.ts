import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createUserSlice,
  type UserSlice,
} from "@/features/auth/presentation/store/user.slice";
import {
  createSchoolSlice,
  type SchoolSlice,
} from "@/features/school/presentation/store/school.slice";

type AppStore = UserSlice & SchoolSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSchoolSlice(...a),
    }),
    {
      name: "app-storage",
    },
  ),
);
