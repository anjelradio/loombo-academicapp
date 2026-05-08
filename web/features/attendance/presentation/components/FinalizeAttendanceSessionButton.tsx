"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { finalizeAttendanceSession } from "@/features/attendance/presentation/actions/finalize-attendance-session-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type FinalizeAttendanceSessionButtonProps = {
  schoolId: string;
  sessionId: string;
  disabled?: boolean;
};

export default function FinalizeAttendanceSessionButton({
  schoolId,
  sessionId,
  disabled = false,
}: FinalizeAttendanceSessionButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFinalize = () => {
    startTransition(async () => {
      const result = await finalizeAttendanceSession(schoolId, sessionId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo finalizar la sesion de asistencia");
        return;
      }

      appToast.success(`Sesion finalizada. Faltantes marcados como falta: ${result.data?.createdMissing ?? 0}`);
      setOpen(false);
      router.refresh();
    });
  };

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="h-10 rounded-lg border border-[#c7dbf1] bg-white px-4 text-sm font-semibold text-[#345b86] opacity-70"
      >
        Sesion finalizada
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg bg-[#1E3A5F] px-4 text-sm font-semibold text-white hover:bg-[#152B47]"
      >
        Finalizar asistencia
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Finalizar sesion"
        description="Los estudiantes sin registro se marcaran como falta. Esta accion no se puede deshacer."
        actionText={isPending ? "Finalizando..." : "Finalizar"}
        cancelText="Cancelar"
        onAction={handleFinalize}
        actionDisabled={isPending}
      />
    </>
  );
}
