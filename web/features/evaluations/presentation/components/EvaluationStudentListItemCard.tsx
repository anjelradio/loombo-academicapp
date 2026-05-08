import type { Student } from "@/features/students/domain/entities/student";

type EvaluationStudentListItemCardProps = {
  student: Student;
};

export default function EvaluationStudentListItemCard({ student }: EvaluationStudentListItemCardProps) {
  return (
    <article className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
      <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Estudiante</p>
      <p className="mt-1 text-base font-semibold text-[#1f4d7d]">
        {student.firstName} {student.lastName}
      </p>
      <p className="mt-1 text-xs text-[#4e7399]">Nacimiento: {student.birthDate.slice(0, 10)}</p>
    </article>
  );
}
