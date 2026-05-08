"use client";

import { useRouter } from "next/navigation";

import { StudentCreateSchema } from "@/features/students/data/schemas";
import { createStudentInCourse } from "@/features/students/presentation/actions/create-student-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import StudentForm from "./StudentForm";

type CreateStudentFormProps = {
  schoolId: string;
  courseId: string;
  onClose: () => void;
};

export default function CreateStudentForm({ schoolId, courseId, onClose }: CreateStudentFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: StudentCreateSchema,
      payload: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        birthDate: formData.get("birthDate"),
      },
      action: (data) => createStudentInCourse(schoolId, courseId, data),
      onSuccess: () => {
        appToast.success("Estudiante registrado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <StudentForm />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Registrando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Registrar estudiante
        </SubmitButton>
      </div>
    </form>
  );
}
