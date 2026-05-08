"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { unlinkStudentFromCourse } from "@/features/students/presentation/actions/unlink-student-action";
import type { Student } from "@/features/students/domain/entities/student";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type UnlinkStudentButtonProps = {
  schoolId: string;
  courseId: string;
  student: Student;
};

export default function UnlinkStudentButton({ schoolId, courseId, student }: UnlinkStudentButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUnlink = () => {
    startTransition(async () => {
      const result = await unlinkStudentFromCourse(schoolId, courseId, student.id);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar el estudiante");
        return;
      }
      appToast.success("Estudiante eliminado correctamente");
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
        title="Eliminar estudiante"
        description={`¿Estas seguro de que quieres eliminar a "${student.firstName} ${student.lastName}"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleUnlink}
        actionDisabled={isPending}
      />
    </>
  );
}
