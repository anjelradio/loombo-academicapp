import Link from "next/link";

import type { AssignmentTeacher } from "@/features/academic/domain/entities/assignment";

type AssignmentTeacherListItemCardProps = {
  schoolId: string;
  teacher: AssignmentTeacher;
};

export default function AssignmentTeacherListItemCard({
  schoolId,
  teacher,
}: AssignmentTeacherListItemCardProps) {
  const fullName = `${teacher.firstName} ${teacher.lastName}`;

  return (
    <Link
      href={`/${schoolId}/academico/asignaciones/${teacher.teacherId}`}
      className="block rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)] transition-colors hover:bg-[#f1f7ff]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Docente</p>
          <p className="mt-1 truncate text-lg font-semibold text-[#1f4d7d]">{fullName}</p>

          {teacher.courseNames.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {teacher.courseNames.map((courseName) => (
                <span
                  key={`${teacher.teacherId}-${courseName}`}
                  className="rounded-full border border-[#c7dbf1] bg-white px-3 py-1 text-xs font-medium text-[#315a85]"
                >
                  {courseName}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#52749a]">Sin asignaciones aun.</p>
          )}
        </div>

        <p className="text-xs font-semibold text-[#315a85]">Administrar</p>
      </div>
    </Link>
  );
}
