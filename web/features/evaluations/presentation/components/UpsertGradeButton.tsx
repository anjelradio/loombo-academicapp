"use client";

import { useState } from "react";

import type { StudentGradebookRow } from "@/features/students/domain/entities/student-gradebook";
import AppModal from "@/features/shared/components/modals/AppModal";

import UpsertGradeForm from "./UpsertGradeForm";

type UpsertGradeButtonProps = {
  schoolId: string;
  evaluationId: string;
  row: StudentGradebookRow;
  disabled?: boolean;
};

export default function UpsertGradeButton({
  schoolId,
  evaluationId,
  row,
  disabled = false,
}: UpsertGradeButtonProps) {
  const [open, setOpen] = useState(false);
  const actionLabel = row.status === "calificado" ? "Editar" : "Calificar";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="h-8 rounded-lg border border-[#c7dbf1] bg-white px-3 text-xs font-semibold text-[#345b86] hover:bg-[#f3f8ff] disabled:opacity-70"
      >
        {actionLabel}
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title={row.status === "calificado" ? "Editar calificacion" : "Calificar estudiante"}
        description={`${row.lastName} ${row.firstName}`}
        size="lg"
      >
        <UpsertGradeForm
          schoolId={schoolId}
          evaluationId={evaluationId}
          row={row}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
