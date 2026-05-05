"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteSubject } from "@/features/academic/presentation/actions/subjects/delete-subject-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type SubjectDeleteButtonProps = {
  schoolId: string;
  subjectId: string;
  subjectName: string;
};

export default function SubjectDeleteButton({ schoolId, subjectId, subjectName }: SubjectDeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteSubject(schoolId, subjectId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar la materia");
        return;
      }
      appToast.success("Materia eliminada correctamente");
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
        aria-label="Eliminar materia"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar materia"
        description={`¿Estas seguro de que quieres eliminar la materia \"${subjectName}\"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
