"use client";

import { useRouter } from "next/navigation";

import { StudentGradeUpsertSchema } from "@/features/students/data/schemas";
import type { StudentGradebookRow } from "@/features/students/domain/entities/student-gradebook";
import { upsertEvaluationGrade } from "@/features/students/presentation/actions/upsert-evaluation-grade-action";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type UpsertGradeFormProps = {
  schoolId: string;
  evaluationId: string;
  row: StudentGradebookRow;
  onClose: () => void;
};

export default function UpsertGradeForm({ schoolId, evaluationId, row, onClose }: UpsertGradeFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: StudentGradeUpsertSchema,
      payload: {
        score: formData.get("score"),
        observation: formData.get("observation"),
      },
      action: (data) => upsertEvaluationGrade(schoolId, evaluationId, row.studentId, data),
      onSuccess: () => {
        appToast.success("Calificacion guardada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      <FormTextField
        id="score"
        name="score"
        label="Nota"
        type="number"
        min={0}
        step="0.01"
        defaultValue={row.score ?? 0}
        required
      />

      <FormTextField
        id="observation"
        name="observation"
        label="Observacion (opcional)"
        defaultValue={row.observation ?? ""}
      />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Guardando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Guardar
        </SubmitButton>
      </div>
    </form>
  );
}
