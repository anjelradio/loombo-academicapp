"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { SubjectCreateSchema } from "@/features/academic/data/schemas/subjects/subject.schema";
import { createSubject } from "@/features/academic/presentation/actions/subjects/create-subject-action";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type SubjectCreateFormProps = {
  schoolId: string;
};

export default function SubjectCreateForm({ schoolId }: SubjectCreateFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: SubjectCreateSchema,
      payload: {
        name: formData.get("name"),
      },
      action: (data) => createSubject(schoolId, data),
      onSuccess: () => {
        formRef.current?.reset();
        appToast.success("Materia registrada correctamente");
        router.refresh();
      },
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <FormTextField
        id="name"
        name="name"
        label="Nombre de la materia"
        labelClassName="text-base font-semibold text-gray-700"
        placeholder="Ej: Ciencias Naturales"
        required
      />

      <SubmitButton
        pendingText="Registrando materia..."
        className="h-12 w-full bg-[#1E3A5F] text-base font-semibold text-white shadow-md hover:bg-[#152B47]"
      >
        Registrar materia
      </SubmitButton>
    </form>
  );
}
