"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { createAttendanceSession } from "@/features/attendance/presentation/actions/create-attendance-session-action";
import { appToast } from "@/features/shared/components/toast/toast";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";

type RegisterAttendanceSessionButtonProps = {
  schoolId: string;
  assignmentId: string;
};

function formatTodayAsIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function RegisterAttendanceSessionButton({
  schoolId,
  assignmentId,
}: RegisterAttendanceSessionButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      const response = await createAttendanceSession(schoolId, {
        attendanceDate: formatTodayAsIsoDate(),
        assignmentId,
      });

      if (!response.ok) {
        appToast.error(response.errors[0] ?? "No se pudo crear la sesion de asistencia");
        return;
      }

      if (!response.data?.id) {
        appToast.error("La sesion se creo, pero no se pudo resolver el destino");
        return;
      }

      const target = `/${schoolId}/docente/asistir/${response.data.id}`;
      router.push(target);
      window.location.assign(target);
    });
  };

  return (
    <PrimaryActionButton
      className="h-10 rounded-lg px-4 text-sm"
      disabled={isPending}
      onClick={handleCreate}
    >
      {isPending ? "Creando..." : "Registrar asistencia"}
    </PrimaryActionButton>
  );
}
