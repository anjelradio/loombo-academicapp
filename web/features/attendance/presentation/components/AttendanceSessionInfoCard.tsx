import type { AttendanceSession } from "@/features/attendance/domain/entities/attendance-session";
import type { AttendanceStatusOption } from "@/features/attendance/domain/entities/attendance-gradebook";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";

import DeleteAttendanceSessionButton from "./DeleteAttendanceSessionButton";
import FinalizeAttendanceSessionButton from "./FinalizeAttendanceSessionButton";

type AttendanceSessionInfoCardProps = {
  schoolId: string;
  session: AttendanceSession;
  statusOptions: AttendanceStatusOption[];
};

export default function AttendanceSessionInfoCard({
  schoolId,
  session,
  statusOptions,
}: AttendanceSessionInfoCardProps) {
  return (
    <AccentCard variant="softBlue" eyebrow="Informacion" title="Detalle de sesion" className="w-full">
      <div className="space-y-3 rounded-xl border border-[#c7dbf1] bg-white p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Sesion</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d]">{session.name}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Fecha</p>
            <p className="mt-1 text-sm font-semibold text-[#315a85]">{session.attendanceDate.slice(0, 10)}</p>
          </div>
          <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Trimestre</p>
            <p className="mt-1 text-sm font-semibold text-[#315a85]">{session.termName}</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Estados disponibles</p>
          <p className="mt-1 text-sm font-semibold text-[#315a85]">{statusOptions.map((item) => item.name).join(" - ")}</p>
        </div>

        <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Estado</p>
          <p className="mt-1 text-sm font-semibold text-[#315a85]">
            {session.isClosed ? "Finalizada" : "Abierta"}
          </p>
        </div>

        <div className="pt-1">
          <div className="flex flex-wrap gap-2">
            <FinalizeAttendanceSessionButton
              schoolId={schoolId}
              sessionId={session.id}
              disabled={session.isClosed}
            />
            <DeleteAttendanceSessionButton
              schoolId={schoolId}
              session={session}
              returnHref={`/${schoolId}/docente/asistencias/${session.assignmentId}`}
            />
          </div>
        </div>
      </div>
    </AccentCard>
  );
}
