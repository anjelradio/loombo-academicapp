"use client";

import { useState } from "react";

import type {
  AssignmentCourseOption,
  AssignmentSubjectOption,
} from "@/features/academic/domain/entities/assignment";
import AppModal from "@/features/shared/components/modals/AppModal";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";

import CreateAssignmentForm from "./CreateAssignmentForm";

type RegisterAssignmentButtonProps = {
  schoolId: string;
  teacherId: string;
  courseOptions: AssignmentCourseOption[];
  subjectOptionsByCourse: Record<string, AssignmentSubjectOption[]>;
};

export default function RegisterAssignmentButton({
  schoolId,
  teacherId,
  courseOptions,
  subjectOptionsByCourse,
}: RegisterAssignmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryActionButton className="h-10 rounded-lg px-4 text-sm" onClick={() => setOpen(true)}>
        Registrar asignacion
      </PrimaryActionButton>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Registrar asignacion"
        description="Selecciona primero un curso y luego las materias que impartira el docente."
        size="xl"
      >
        <CreateAssignmentForm
          schoolId={schoolId}
          teacherId={teacherId}
          courseOptions={courseOptions}
          subjectOptionsByCourse={subjectOptionsByCourse}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
