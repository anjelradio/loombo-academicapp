"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { AssignmentCourseGroup } from "@/features/academic/domain/entities/assignment";
import { deleteTeacherAssignment } from "@/features/academic/presentation/actions/assignments/delete-assignment-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type DeleteAssignmentButtonProps = {
  schoolId: string;
  teacherId: string;
  assignment: AssignmentCourseGroup;
};

export default function DeleteAssignmentButton({
  schoolId,
  teacherId,
  assignment,
}: DeleteAssignmentButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTeacherAssignment(schoolId, teacherId, assignment.courseId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar la asignacion");
        return;
      }

      appToast.success("Asignacion del curso eliminada correctamente");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-8 rounded-lg border border-[#f2c8c8] bg-white px-3 text-xs font-semibold text-[#b84f4f] hover:bg-[#fff5f5]"
      >
        Eliminar
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar asignacion del curso"
        description={`Se eliminaran todas las materias asignadas en "${assignment.courseName}" para este docente.`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
