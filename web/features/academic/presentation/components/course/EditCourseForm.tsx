"use client";

import { useRouter } from "next/navigation";

import { updateCourse } from "@/features/academic/presentation/actions/courses/update-course-action";
import { CourseUpdateSchema } from "@/features/academic/data/schemas/courses";
import type { Course, CourseFormOptions } from "@/features/academic/domain/entities/course";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import CourseForm from "./CourseForm";

type EditCourseFormProps = {
  schoolId: string;
  course: Course;
  formOptions: CourseFormOptions;
  onClose: () => void;
};

export default function EditCourseForm({ schoolId, course, formOptions, onClose }: EditCourseFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: CourseUpdateSchema,
      payload: {
        name: formData.get("name"),
        schoolLevelId: formData.get("schoolLevelId"),
        subjectIds: formData.getAll("subjectIds"),
      },
      action: (data) => updateCourse(schoolId, course.id, data),
      onSuccess: () => {
        appToast.success("Curso actualizado correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <CourseForm formOptions={formOptions} course={course} />

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
