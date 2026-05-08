"use client";

import { useState } from "react";

import type { Student } from "@/features/students/domain/entities/student";
import AppModal from "@/features/shared/components/modals/AppModal";

import EditStudentForm from "./EditStudentForm";

type EditStudentButtonProps = {
  schoolId: string;
  student: Student;
};

export default function EditStudentButton({ schoolId, student }: EditStudentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-8 rounded-lg border border-[#c7dbf1] bg-white px-3 text-xs font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
      >
        Editar
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar estudiante"
        description="Actualiza los datos del estudiante."
        size="lg"
      >
        <EditStudentForm schoolId={schoolId} student={student} onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
}
