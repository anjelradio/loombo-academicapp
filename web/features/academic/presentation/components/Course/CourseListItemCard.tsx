import type { Course, CourseFormOptions } from "@/features/academic/domain/entities/course";

import DeleteCourseButton from "./DeleteCourseButton";
import EditCourseButton from "./EditCourseButton";

type CourseListItemCardProps = {
  schoolId: string;
  course: Course;
  formOptions: CourseFormOptions;
};

export default function CourseListItemCard({ schoolId, course, formOptions }: CourseListItemCardProps) {
  return (
    <article className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Curso</p>
          <p className="mt-1 text-lg font-semibold text-[#1f4d7d]">{course.name}</p>
          <p className="mt-2 text-sm text-[#4e7399]">Nivel: {course.levelName}</p>
        </div>

        <div className="flex items-center gap-2">
          <EditCourseButton schoolId={schoolId} course={course} formOptions={formOptions} />
          <DeleteCourseButton schoolId={schoolId} courseId={course.id} courseName={course.name} />
        </div>
      </div>
    </article>
  );
}
