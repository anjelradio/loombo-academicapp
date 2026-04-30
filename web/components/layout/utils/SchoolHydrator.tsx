"use client";

import { useEffect } from "react";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import type { School } from "@/features/school/domain/entities/school";

export function SchoolHydrator({ school }: { school: School }) {
  const setSelectedSchool = useAppStore((s) => s.setSelectedSchool);
  const currentSelectedSchool = useAppStore((s) => s.selectedSchool);

  useEffect(() => {
    const shouldHydrate =
      !currentSelectedSchool ||
      currentSelectedSchool.id !== school.id ||
      currentSelectedSchool.name !== school.name ||
      currentSelectedSchool.type !== school.type ||
      currentSelectedSchool.role !== school.role;

    if (!shouldHydrate) return;

    setSelectedSchool({
      ...school,
      role: school.role ?? currentSelectedSchool?.role,
    });
  }, [school, setSelectedSchool, currentSelectedSchool]);

  return null;
}
