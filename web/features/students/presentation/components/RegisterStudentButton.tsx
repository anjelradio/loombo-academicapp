"use client";

import { useState } from "react";

import AppModal from "@/features/shared/components/modals/AppModal";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";

import CreateStudentForm from "./CreateStudentForm";

type RegisterStudentButtonProps = {
  schoolId: string;
  courseId: string;
};

export default function RegisterStudentButton({ schoolId, courseId }: RegisterStudentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryActionButton className="h-10 rounded-lg px-4 text-sm" onClick={() => setOpen(true)}>
        Registrar estudiante
      </PrimaryActionButton>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Registrar estudiante"
        description="Completa los datos del estudiante para vincularlo al curso."
        size="lg"
      >
        <CreateStudentForm schoolId={schoolId} courseId={courseId} onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
}
