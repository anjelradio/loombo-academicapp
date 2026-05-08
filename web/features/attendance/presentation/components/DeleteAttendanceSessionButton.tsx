"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { AttendanceSession } from "@/features/attendance/domain/entities/attendance-session";
import { deleteAttendanceSession } from "@/features/attendance/presentation/actions/delete-attendance-session-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type DeleteAttendanceSessionButtonProps = {
  schoolId: string;
  session: AttendanceSession;
  returnHref: string;
};

export default function DeleteAttendanceSessionButton({
  schoolId,
  session,
  returnHref,
}: DeleteAttendanceSessionButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAttendanceSession(schoolId, session.id);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar la sesion");
        return;
      }

      appToast.success("Sesion eliminada correctamente");
      setOpen(false);
      router.push(returnHref);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg border border-[#f2c8c8] bg-white px-4 text-sm font-semibold text-[#b84f4f] hover:bg-[#fff5f5]"
      >
        Eliminar sesion
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar sesion"
        description={`¿Estas seguro de eliminar "${session.name}"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
