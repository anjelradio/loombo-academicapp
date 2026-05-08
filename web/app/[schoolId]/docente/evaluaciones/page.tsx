import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { assignmentRepository } from "@/features/academic/data/repositories/assignment.repository";
import TeacherAssignmentGroupsCard from "@/features/academic/presentation/components/teacher-assignment/TeacherAssignmentGroupsCard";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function DocenteEvaluacionesPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await assignmentRepository.getTeacherAssignmentGroups(schoolId);

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener asignaciones del docente.");
  }

  const totalCourses = response.data.length;
  const totalSubjects = response.data.reduce((count, group) => count + group.subjects.length, 0);

  return (
    <>
      <SchoolPageHeader section="Docente" page="Evaluaciones" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Evaluaciones"
          description="Selecciona una materia para gestionar evaluaciones segun tus asignaciones activas."
          tone="light"
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(260px,30%)_minmax(0,70%)]">
          <div className="space-y-5">
            <IndicatorsSummaryCard
              eyebrow="Panorama"
              title="Tu jornada"
              description="Vista rapida de tu carga academica para preparar evaluaciones."
              items={[
                {
                  label: "Cursos activos",
                  value: totalCourses,
                  hint: "Con materias asignadas",
                },
                {
                  label: "Materias",
                  value: totalSubjects,
                  hint: "Disponibles para evaluar",
                },
              ]}
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Proximo"
              title="Tablero docente"
              description="Pronto podras filtrar por periodo, marcar avances y seguir pendientes desde un solo lugar."
            >
              <div className="rounded-xl border border-[#c7dbf1] bg-white p-4 text-sm text-[#456a92]">
                Esta area se ira activando por etapas para mantener una navegacion simple y enfocada.
              </div>
            </AccentCard>
          </div>

          <TeacherAssignmentGroupsCard schoolId={schoolId} mode="evaluaciones" groups={response.data} />
        </div>
      </ContentGridSurface>
    </>
  );
}
