import type { Student } from "@/features/students/domain/entities/student";
import EditStudentButton from "./EditStudentButton";
import UnlinkStudentButton from "./UnlinkStudentButton";

type StudentListItemCardProps = {
  schoolId: string;
  courseId: string;
  student: Student;
};

export default function StudentListItemCard({ schoolId, courseId, student }: StudentListItemCardProps) {
  return (
    <article className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Estudiante</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d]">
            {student.firstName} {student.lastName}
          </p>
          <p className="mt-1 text-xs text-[#4e7399]">Nacimiento: {student.birthDate.slice(0, 10)}</p>
        </div>

        <div className="flex items-center gap-2">
          <EditStudentButton schoolId={schoolId} student={student} />
          <UnlinkStudentButton schoolId={schoolId} courseId={courseId} student={student} />
        </div>
      </div>
    </article>
  );
}
