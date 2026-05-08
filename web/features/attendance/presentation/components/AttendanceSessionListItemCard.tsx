import Link from "next/link";

import type { AttendanceSession } from "@/features/attendance/domain/entities/attendance-session";

type AttendanceSessionListItemCardProps = {
  schoolId: string;
  session: AttendanceSession;
};

export default function AttendanceSessionListItemCard({
  schoolId,
  session,
}: AttendanceSessionListItemCardProps) {
  return (
    <Link
      href={`/${schoolId}/docente/asistir/${session.id}`}
      className="block rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)] transition-colors hover:bg-[#f1f7ff]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Asistencia</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d]">{session.attendanceDate.slice(0, 10)}</p>
          <span className="mt-2 inline-flex rounded-full border border-[#c7dbf1] bg-white px-3 py-1 text-xs font-medium text-[#315a85]">
            {session.termName}
          </span>
        </div>
        <p className="text-xs font-semibold text-[#315a85]">
          {session.isClosed ? "Finalizada" : "Abierta"}
        </p>
      </div>
    </Link>
  );
}
