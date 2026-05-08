import type { AssignmentCourseGroup } from "@/features/academic/domain/entities/assignment";
import type { AssignmentSubjectOption } from "@/features/academic/domain/entities/assignment";
import DeleteAssignmentButton from "./DeleteAssignmentButton";
import EditAssignmentButton from "./EditAssignmentButton";

type TeacherAssignmentCourseCardProps = {
  schoolId: string;
  teacherId: string;
  assignment: AssignmentCourseGroup;
  subjectOptions: AssignmentSubjectOption[];
};

export default function TeacherAssignmentCourseCard({
  schoolId,
  teacherId,
  assignment,
  subjectOptions,
}: TeacherAssignmentCourseCardProps) {
  return (
    <article className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Curso</p>
          <p className="mt-1 truncate text-base font-semibold text-[#1f4d7d]">{assignment.courseName}</p>

          {assignment.subjects.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {assignment.subjects.map((subject) => (
                <span
                  key={`${assignment.courseId}-${subject.subjectId}`}
                  className="rounded-full border border-[#c7dbf1] bg-white px-3 py-1 text-xs font-medium text-[#315a85]"
                >
                  {subject.subjectName}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#52749a]">Sin materias asignadas.</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <EditAssignmentButton
            schoolId={schoolId}
            teacherId={teacherId}
            assignment={assignment}
            subjectOptions={subjectOptions}
          />
          <DeleteAssignmentButton schoolId={schoolId} teacherId={teacherId} assignment={assignment} />
        </div>
      </div>
    </article>
  );
}
