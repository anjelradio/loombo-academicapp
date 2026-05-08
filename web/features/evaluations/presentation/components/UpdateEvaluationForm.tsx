"use client";

import { useRouter } from "next/navigation";

import { EvaluationUpdateSchema } from "@/features/evaluations/data/schemas";
import type {
  Evaluation,
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import { updateEvaluation } from "@/features/evaluations/presentation/actions/update-evaluation-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import EvaluationForm from "./EvaluationForm";

type UpdateEvaluationFormProps = {
  schoolId: string;
  evaluation: Evaluation;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
  onClose: () => void;
};

export default function UpdateEvaluationForm({
  schoolId,
  evaluation,
  typeOptions,
  termOptions,
  onClose,
}: UpdateEvaluationFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: EvaluationUpdateSchema,
      payload: {
        name: formData.get("name"),
        description: formData.get("description"),
        presentationDate: formData.get("presentationDate"),
        termId: formData.get("termId"),
        evaluationTypeId: formData.get("evaluationTypeId"),
      },
      action: (data) => updateEvaluation(schoolId, evaluation.id, data),
      onSuccess: () => {
        appToast.success("Evaluacion actualizada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <EvaluationForm evaluation={evaluation} typeOptions={typeOptions} termOptions={termOptions} />

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
