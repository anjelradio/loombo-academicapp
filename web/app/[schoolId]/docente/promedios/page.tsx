import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { assignmentRepository } from "@/features/academic/data/repositories/assignment.repository";
import TeacherAssignmentGroupsCard from "@/features/academic/presentation/components/teacher-assignment/TeacherAssignmentGroupsCard";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function DocentePromediosPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await assignmentRepository.getAssignmentGroupsForContext(schoolId);

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener asignaciones.");
  }

  return (
    <>
      <SchoolPageHeader section="Docente" page="Promedios" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Promedios trimestrales"
          description="Selecciona una materia para consultar y calcular promedios trimestrales por estudiante."
          tone="light"
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(260px,30%)_minmax(0,70%)]">
          <div className="space-y-5">
            <IndicatorsSummaryCard
              eyebrow="Panorama"
              title="Resumen rapido"
              description="Estos indicadores se activaran en siguientes iteraciones del tablero."
              items={[
                { label: "Cursos", value: "--", hint: "Proximamente" },
                { label: "Materias", value: "--", hint: "Proximamente" },
              ]}
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Proximo"
              title="Detalle por trimestre"
              description="En la siguiente etapa podras elegir trimestre, calcular y abrir el detalle por estudiante."
            >
              <div className="rounded-xl border border-[#c7dbf1] bg-white p-4 text-sm text-[#456a92]">
                Esta area se mantiene como placeholder mientras activamos el flujo completo de promedios.
              </div>
            </AccentCard>
          </div>

          <TeacherAssignmentGroupsCard
            schoolId={schoolId}
            mode="promedios"
            basePath="docente/promedios"
            groups={response.data}
          />
        </div>
      </ContentGridSurface>
    </>
  );
}
