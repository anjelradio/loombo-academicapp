"use client";

import { useRouter } from "next/navigation";

import { createEvaluationWeight } from "@/features/academic/presentation/actions/evaluation-weights/create-evaluation-weight-action";
import { EvaluationWeightUpsertSchema } from "@/features/academic/data/schemas/evaluation-weights";
import type { EvaluationWeightLevel } from "@/features/academic/domain/entities/evaluation-weight";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import WeightConfigForm from "./WeightConfigForm";

type CreateWeightConfigFormProps = {
  schoolId: string;
  level: EvaluationWeightLevel;
  onClose: () => void;
};

export default function CreateWeightConfigForm({
  schoolId,
  level,
  onClose,
}: CreateWeightConfigFormProps) {
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
      action: (data) => createEvaluationWeight(schoolId, level.schoolLevelId, data),
      onSuccess: () => {
        appToast.success("Ponderacion configurada correctamente");
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
          Configurar ponderacion
        </SubmitButton>
      </div>
    </form>
  );
}
