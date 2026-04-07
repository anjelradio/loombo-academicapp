"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/appStore";
import { School } from "@/lib/types";

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
