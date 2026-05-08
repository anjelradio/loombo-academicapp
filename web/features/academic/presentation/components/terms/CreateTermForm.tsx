"use client";

import { useRouter } from "next/navigation";

import { createTerm } from "@/features/academic/presentation/actions/terms/create-term-action";
import { TermCreateSchema } from "@/features/academic/data/schemas/terms";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import TermForm from "./TermForm";

type CreateTermFormProps = {
  schoolId: string;
  onClose: () => void;
};

export default function CreateTermForm({ schoolId, onClose }: CreateTermFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: TermCreateSchema,
      payload: {
        name: formData.get("name"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
      },
      action: (data) => createTerm(schoolId, data),
      onSuccess: () => {
        appToast.success("Trimestre registrado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <TermForm />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Registrando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Registrar trimestre
        </SubmitButton>
      </div>
    </form>
  );
}
