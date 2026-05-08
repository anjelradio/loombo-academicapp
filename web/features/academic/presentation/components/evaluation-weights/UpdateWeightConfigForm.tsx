"use client";

import { useRouter } from "next/navigation";

import { updateEvaluationWeight } from "@/features/academic/presentation/actions/evaluation-weights/update-evaluation-weight-action";
import { EvaluationWeightUpsertSchema } from "@/features/academic/data/schemas/evaluation-weights";
import type { EvaluationWeightLevel } from "@/features/academic/domain/entities/evaluation-weight";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import WeightConfigForm from "./WeightConfigForm";

type UpdateWeightConfigFormProps = {
  schoolId: string;
  level: EvaluationWeightLevel;
  onClose: () => void;
};

export default function UpdateWeightConfigForm({
  schoolId,
  level,
  onClose,
}: UpdateWeightConfigFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: EvaluationWeightUpsertSchema,
      payload: {
        ser: formData.get("ser"),
        saber: formData.get("saber"),
        hacer: formData.get("hacer"),
        autoevaluacion: formData.get("autoevaluacion"),
      },
      action: (data) => updateEvaluationWeight(schoolId, level.schoolLevelId, data),
      onSuccess: () => {
        appToast.success("Ponderacion actualizada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <WeightConfigForm level={level} />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Guardando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Guardar cambios
        </SubmitButton>
      </div>
    </form>
  );
}
