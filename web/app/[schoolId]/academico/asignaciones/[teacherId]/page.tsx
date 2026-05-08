import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { assignmentRepository } from "@/features/academic/data/repositories";
import RegisterAssignmentButton from "@/features/academic/presentation/components/assignment/RegisterAssignmentButton";
import TeacherAssignmentCourseCard from "@/features/academic/presentation/components/assignment/TeacherAssignmentCourseCard";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function TeacherAssignmentsPage({
  params,
}: {
  params: Promise<{ schoolId: string; teacherId: string }>;
}) {
  const { schoolId, teacherId } = await params;

  const [assignmentsResponse, courseOptionsResponse] = await Promise.all([
    assignmentRepository.getTeacherAssignments(schoolId, teacherId),
    assignmentRepository.getAssignmentCourseOptions(schoolId),
  ]);

  if (!assignmentsResponse.ok) {
    throw new Error(assignmentsResponse.errors[0] ?? "Error al obtener asignaciones del docente.");
  }

  if (!courseOptionsResponse.ok) {
    throw new Error(courseOptionsResponse.errors[0] ?? "Error al obtener cursos para asignaciones.");
  }

  const courseOptions = courseOptionsResponse.data;
  const subjectOptionsEntries = await Promise.all(
    courseOptions.map(async (courseOption) => {
      const subjectsResponse = await assignmentRepository.getAssignmentSubjectOptions(
        schoolId,
        courseOption.courseId,
      );
      if (!subjectsResponse.ok) {
        throw new Error(subjectsResponse.errors[0] ?? "Error al obtener materias por curso.");
      }
      return [courseOption.courseId, subjectsResponse.data] as const;
    }),
  );
  const subjectOptionsByCourse = Object.fromEntries(subjectOptionsEntries);

  const data = assignmentsResponse.data;
  const teacherFullName = `${data.firstName} ${data.lastName}`;

  return (
    <>
      <SchoolPageHeader section="Academico" page="Asignaciones" />
      <ContentGridSurface variant="diagonal">
        <PageHeading
          title={teacherFullName}
          description="Administra las asignaciones del docente por curso y materias vinculadas."
          tone="light"
          returnHref={`/${schoolId}/academico/asignaciones`}
          returnLabel="Volver a asignaciones"
        />

        <section className="grid items-start gap-4 xl:grid-cols-[30%_70%]">
          <div className="space-y-4">
            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen"
              description="Estos indicadores se conectaran con metricas reales en una siguiente iteracion."
              items={[
                { label: "Cursos asignados", value: "--" },
                { label: "Materias totales", value: "--" },
              ]}
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Estado"
              title="Implementacion en curso"
              description="Pronto se habilitara importacion masiva de asignaciones docentes."
            />
          </div>

          <div className="space-y-4">
            <AccentCard variant="softBlue" eyebrow="Acciones" className="p-4">
              <div className="flex flex-wrap gap-2">
                <RegisterAssignmentButton
                  schoolId={schoolId}
                  teacherId={teacherId}
                  courseOptions={courseOptions}
                  subjectOptionsByCourse={subjectOptionsByCourse}
                />
                <button
                  type="button"
                  className="h-10 rounded-lg bg-[#3f5f83] px-4 text-sm text-white hover:bg-[#355170] opacity-80"
                  disabled
                >
                  Importar asignaciones
                </button>
              </div>
            </AccentCard>

            <AccentCard variant="base" eyebrow="Listado de asignaciones" className="min-h-[420px] p-5">
              <ScrollArea className="h-[360px] pr-3">
                <div className="space-y-3 pb-1">
                  {data.assignments.length ? (
                    data.assignments.map((assignment) => (
                      <TeacherAssignmentCourseCard
                        key={assignment.courseId}
                        schoolId={schoolId}
                        teacherId={teacherId}
                        assignment={assignment}
                        subjectOptions={subjectOptionsByCourse[assignment.courseId] ?? []}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                      Este docente aun no tiene asignaciones registradas.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </AccentCard>
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
