"use client";

import type { Student } from "@/features/students/domain/entities/student";
import { FormDateField } from "@/features/shared/components/forms/FormDateField";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";

type StudentFormProps = {
  student?: Student;
};

export default function StudentForm({ student }: StudentFormProps) {
  const defaultBirthDate = student?.birthDate.slice(0, 10);

  return (
    <div className="space-y-5">
      <FormTextField
        id="firstName"
        name="firstName"
        label="Nombres"
        placeholder="Ej: Juan Carlos"
        defaultValue={student?.firstName}
        required
      />

      <FormTextField
        id="lastName"
        name="lastName"
        label="Apellidos"
        placeholder="Ej: Perez Rojas"
        defaultValue={student?.lastName}
        required
      />

      <FormDateField
        id="birthDate"
        name="birthDate"
        label="Fecha de nacimiento"
        defaultValue={defaultBirthDate}
        required
      />
    </div>
  );
}
