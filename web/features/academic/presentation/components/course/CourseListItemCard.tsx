import Link from "next/link";

import type { Course } from "@/features/academic/domain/entities/course";

type CourseListItemCardProps = {
  schoolId: string;
  course: Course;
};

export default function CourseListItemCard({ schoolId, course }: CourseListItemCardProps) {
  return (
    <Link
      href={`/${schoolId}/academico/cursos/${course.id}`}
      className="block rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)] transition-colors hover:bg-[#f1f7ff]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Curso</p>
          <p className="mt-1 text-lg font-semibold text-[#1f4d7d]">{course.name}</p>
          <p className="mt-2 text-sm text-[#4e7399]">Nivel: {course.levelName}</p>
        </div>

        <p className="text-xs font-semibold text-[#315a85]">Administrar</p>
      </div>
    </Link>
  );
}
