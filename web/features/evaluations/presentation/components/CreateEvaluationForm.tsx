"use client";

import { useRouter } from "next/navigation";

import { EvaluationCreateSchema } from "@/features/evaluations/data/schemas";
import type {
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import { createEvaluation } from "@/features/evaluations/presentation/actions/create-evaluation-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import EvaluationForm from "./EvaluationForm";

type CreateEvaluationFormProps = {
  schoolId: string;
  assignmentId: string;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
  onClose: () => void;
};

export default function CreateEvaluationForm({
  schoolId,
  assignmentId,
  typeOptions,
  termOptions,
  onClose,
}: CreateEvaluationFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: EvaluationCreateSchema,
      payload: {
        name: formData.get("name"),
        description: formData.get("description"),
        presentationDate: formData.get("presentationDate"),
        termId: formData.get("termId"),
        evaluationTypeId: formData.get("evaluationTypeId"),
        assignmentId: formData.get("assignmentId"),
      },
      action: (data) => createEvaluation(schoolId, data),
      onSuccess: () => {
        appToast.success("Evaluacion registrada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <EvaluationForm
        assignmentId={assignmentId}
        typeOptions={typeOptions}
        termOptions={termOptions}
      />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Registrando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Registrar evaluacion
        </SubmitButton>
      </div>
    </form>
  );
}
