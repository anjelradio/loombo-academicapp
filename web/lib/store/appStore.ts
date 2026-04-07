import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./slices/userSlice";
import { createSchoolSlice, SchoolSlice } from "./slices/schoolSlice";

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
