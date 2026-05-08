"use client";

import { useRouter } from "next/navigation";

import { createCourse } from "@/features/academic/presentation/actions/courses/create-course-action";
import { CourseCreateSchema } from "@/features/academic/data/schemas/courses";
import type { CourseFormOptions } from "@/features/academic/domain/entities/course";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import CourseForm from "./CourseForm";

type CreateCourseFormProps = {
  schoolId: string;
  formOptions: CourseFormOptions;
  onClose: () => void;
};

export default function CreateCourseForm({ schoolId, formOptions, onClose }: CreateCourseFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: CourseCreateSchema,
      payload: {
        name: formData.get("name"),
        schoolLevelId: formData.get("schoolLevelId"),
        subjectIds: formData.getAll("subjectIds"),
      },
      action: (data) => createCourse(schoolId, data),
      onSuccess: () => {
        appToast.success("Curso registrado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <CourseForm formOptions={formOptions} />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Registrando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Registrar curso
        </SubmitButton>
      </div>
    </form>
  );
}
