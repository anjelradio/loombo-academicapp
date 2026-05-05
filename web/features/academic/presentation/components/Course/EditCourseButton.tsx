"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import type { Course, CourseFormOptions } from "@/features/academic/domain/entities/course";
import AppModal from "@/features/shared/components/modals/AppModal";

import EditCourseForm from "./EditCourseForm";

type EditCourseButtonProps = {
  schoolId: string;
  course: Course;
  formOptions: CourseFormOptions;
};

export default function EditCourseButton({ schoolId, course, formOptions }: EditCourseButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
        aria-label="Editar curso"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar curso"
        description="Actualiza el nombre, nivel y materias vinculadas del curso."
        size="xl"
      >
        <EditCourseForm
          schoolId={schoolId}
          course={course}
          formOptions={formOptions}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
