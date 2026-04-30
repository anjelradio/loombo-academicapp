"use client";

import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { useAppStore } from "@/features/shared/presentation/store/app-store";

export default function UserEmailField() {
  const { user } = useAppStore();

  return (
    <FormTextField
      id="email"
      type="email"
      name="email"
      label="Correo actual"
      labelClassName="text-sm font-semibold"
      value={user?.email ?? ""}
      placeholder="correo@ejemplo.com"
      readOnly
      className="h-11 border-gray-300 bg-gray-50"
    />
  );
}
