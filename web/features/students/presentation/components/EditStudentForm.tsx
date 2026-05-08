"use client";

import { useRouter } from "next/navigation";

import type { Student } from "@/features/students/domain/entities/student";
import { StudentUpdateSchema } from "@/features/students/data/schemas";
import { updateStudent } from "@/features/students/presentation/actions/update-student-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import StudentForm from "./StudentForm";

type EditStudentFormProps = {
  schoolId: string;
  student: Student;
  onClose: () => void;
};

export default function EditStudentForm({ schoolId, student, onClose }: EditStudentFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: StudentUpdateSchema,
      payload: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        birthDate: formData.get("birthDate"),
      },
      action: (data) => updateStudent(schoolId, student.id, data),
      onSuccess: () => {
        appToast.success("Estudiante actualizado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <StudentForm student={student} />

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
