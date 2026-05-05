"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteCourse } from "@/features/academic/presentation/actions/courses/delete-course-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type DeleteCourseButtonProps = {
  schoolId: string;
  courseId: string;
  courseName: string;
};

export default function DeleteCourseButton({ schoolId, courseId, courseName }: DeleteCourseButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCourse(schoolId, courseId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar el curso");
        return;
      }
      appToast.success("Curso eliminado correctamente");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#f2c8c8] bg-white text-[#b84f4f] transition-colors hover:bg-[#fff5f5]"
        aria-label="Eliminar curso"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar curso"
        description={`¿Estas seguro de que quieres eliminar el curso \"${courseName}\"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
