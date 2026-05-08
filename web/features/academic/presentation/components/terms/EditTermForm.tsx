"use client";

import { useRouter } from "next/navigation";

import { updateTerm } from "@/features/academic/presentation/actions/terms/update-term-action";
import { TermUpdateSchema } from "@/features/academic/data/schemas/terms";
import type { Term } from "@/features/academic/domain/entities/term";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import TermForm from "./TermForm";

type EditTermFormProps = {
  schoolId: string;
  term: Term;
  onClose: () => void;
};

export default function EditTermForm({ schoolId, term, onClose }: EditTermFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: TermUpdateSchema,
      payload: {
        name: formData.get("name"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
      },
      action: (data) => updateTerm(schoolId, term.id, data),
      onSuccess: () => {
        appToast.success("Trimestre actualizado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <TermForm term={term} />

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
