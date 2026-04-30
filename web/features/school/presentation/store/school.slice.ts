import type { School } from "@/features/school/domain/entities/school";
import type { StateCreator } from "zustand";

export interface SchoolSlice {
  selectedSchool: School | null;
  setSelectedSchool: (school: School) => void;
  clearSelectedSchool: () => void;
}

export const createSchoolSlice: StateCreator<SchoolSlice> = (set) => ({
  selectedSchool: null,
  setSelectedSchool: (school) =>
    set({
      selectedSchool: school,
    }),
  clearSelectedSchool: () =>
    set({
      selectedSchool: null,
    }),
});
