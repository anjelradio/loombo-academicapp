"use client";

import { useState } from "react";

import type {
  AssignmentCourseGroup,
  AssignmentSubjectOption,
} from "@/features/academic/domain/entities/assignment";
import AppModal from "@/features/shared/components/modals/AppModal";

import EditAssignmentForm from "./EditAssignmentForm";

type EditAssignmentButtonProps = {
  schoolId: string;
  teacherId: string;
  assignment: AssignmentCourseGroup;
  subjectOptions: AssignmentSubjectOption[];
};

export default function EditAssignmentButton({
  schoolId,
  teacherId,
  assignment,
  subjectOptions,
}: EditAssignmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-8 rounded-lg border border-[#c7dbf1] bg-white px-3 text-xs font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
      >
        Editar
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar asignacion"
        description="Actualiza las materias asignadas para este curso."
        size="xl"
      >
        <EditAssignmentForm
          schoolId={schoolId}
          teacherId={teacherId}
          assignment={assignment}
          subjectOptions={subjectOptions}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
