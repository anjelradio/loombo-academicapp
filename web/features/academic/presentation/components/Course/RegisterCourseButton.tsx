"use client";

import { useState } from "react";

import type { CourseFormOptions } from "@/features/academic/domain/entities/course";
import AppModal from "@/features/shared/components/modals/AppModal";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";
import CreateCourseForm from "./CreateCourseForm";

type RegisterCourseButtonProps = {
  schoolId: string;
  formOptions: CourseFormOptions;
};

export default function RegisterCourseButton({ schoolId, formOptions }: RegisterCourseButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryActionButton onClick={() => setOpen(true)}>Registrar curso</PrimaryActionButton>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Registrar curso"
        description="Completa los datos del curso para registrarlo en tu escuela."
        size="xl"
      >
        <CreateCourseForm
          schoolId={schoolId}
          formOptions={formOptions}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
