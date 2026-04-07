"use client";

import { useEffect } from "react";

export function SchoolThemeBodyClass() {
  useEffect(() => {
    document.body.classList.add("school-theme-portal");

    return () => {
      document.body.classList.remove("school-theme-portal");
    };
  }, []);

  return null;
}
