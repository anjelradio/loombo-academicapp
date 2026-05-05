"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { updateSubject } from "@/features/academic/presentation/actions/subjects/update-subject-action";
import { SubjectUpdateSchema } from "@/features/academic/data/schemas/subjects/subject.schema";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import AppModal from "@/features/shared/components/modals/AppModal";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type SubjectEditButtonProps = {
  schoolId: string;
  subjectId: string;
  currentName: string;
};

export default function SubjectEditButton({ schoolId, subjectId, currentName }: SubjectEditButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: SubjectUpdateSchema,
      payload: {
        name: formData.get("name"),
      },
      action: (data) => updateSubject(schoolId, subjectId, data),
      onSuccess: () => {
        appToast.success("Materia actualizada correctamente");
        setOpen(false);
        router.refresh();
      },
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
        aria-label="Editar materia"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar materia"
        description="Actualiza el nombre de la materia seleccionada."
        className="sm:max-w-lg"
      >
        <form action={handleSubmit} className="space-y-5">
          <FormTextField
            id="name"
            name="name"
            label="Nombre de la materia"
            defaultValue={currentName}
            placeholder="Ej: Ciencias Naturales"
            className="h-12 bg-white text-slate-900 placeholder:text-slate-400"
            required
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <ModalSecondaryButton onClick={() => setOpen(false)}>Cancelar</ModalSecondaryButton>
            <SubmitButton
              pendingText="Guardando..."
              className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
            >
              Editar materia
            </SubmitButton>
          </div>
        </form>
      </AppModal>
    </>
  );
}
