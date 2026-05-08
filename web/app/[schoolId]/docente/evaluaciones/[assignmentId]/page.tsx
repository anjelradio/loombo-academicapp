import { redirect } from "next/navigation";

import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { evaluationRepository } from "@/features/evaluations/data/repositories";
import EvaluationListItemCard from "@/features/evaluations/presentation/components/EvaluationListItemCard";
import RegisterEvaluationButton from "@/features/evaluations/presentation/components/RegisterEvaluationButton";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import AppPagination from "@/features/shared/components/navigation/AppPagination";

export default async function AssignmentEvaluacionesPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string; assignmentId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { schoolId, assignmentId } = await params;
  const filters = await searchParams;

  const page = Number(filters.page ?? "1");
  const safePage = Number.isNaN(page) ? 1 : page;

  if (safePage < 1) {
    redirect(`/${schoolId}/docente/evaluaciones/${assignmentId}`);
  }

  const pageSize = 8;
  const [response, typeOptionsResponse, termOptionsResponse] = await Promise.all([
    evaluationRepository.getEvaluationsByAssignment(
      schoolId,
      assignmentId,
      safePage,
      pageSize,
    ),
    evaluationRepository.getEvaluationTypeOptions(schoolId),
    evaluationRepository.getEvaluationTermOptions(schoolId),
  ]);

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener evaluaciones.");
  }

  if (!typeOptionsResponse.ok) {
    throw new Error(typeOptionsResponse.errors[0] ?? "Error al obtener tipos de evaluacion.");
  }

  if (!termOptionsResponse.ok) {
    throw new Error(termOptionsResponse.errors[0] ?? "Error al obtener trimestres.");
  }

  const data = response.data;
  if (safePage > data.totalPages && data.totalPages > 0) {
    redirect(`/${schoolId}/docente/evaluaciones/${assignmentId}`);
  }

  return (
    <>
      <SchoolPageHeader section="Docente" page="Evaluaciones" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Gestion de evaluaciones"
          description="Consulta las evaluaciones registradas de esta materia y prepara la siguiente evaluacion."
          tone="light"
          returnHref={`/${schoolId}/docente/evaluaciones`}
          returnLabel="Volver a evaluaciones"
        />

        <section className="grid items-start gap-5 xl:grid-cols-[30%_70%]">
          <div className="space-y-5">
            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen de evaluaciones"
              description="Estos indicadores se conectaran con metricas reales en una siguiente iteracion."
              items={[
                { label: "Evaluaciones totales", value: "--" },
                { label: "Pendientes de calificar", value: "--" },
              ]}
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Estado"
              title="Implementacion en curso"
              description="Pronto se habilitara la gestion completa de evaluaciones desde esta vista."
            />
          </div>

          <AccentCard variant="base" eyebrow="Listado" className="flex min-h-[460px] flex-col p-5">
            <div className="mb-4 flex justify-end">
              <RegisterEvaluationButton
                schoolId={schoolId}
                assignmentId={assignmentId}
                typeOptions={typeOptionsResponse.data}
                termOptions={termOptionsResponse.data}
              />
            </div>

            <ScrollArea className="h-[380px] pr-3">
              <div className="space-y-3 pb-1">
                {data.evaluations.length ? (
                  data.evaluations.map((evaluation) => (
                    <EvaluationListItemCard key={evaluation.id} schoolId={schoolId} evaluation={evaluation} />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    Aun no hay evaluaciones registradas para esta materia.
                  </div>
                )}
              </div>
            </ScrollArea>

            <AppPagination
              page={data.page}
              totalPages={data.totalPages}
              basePath={`/${schoolId}/docente/evaluaciones/${assignmentId}`}
              hasPrev={data.hasPrev}
              hasNext={data.hasNext}
            />
          </AccentCard>
        </section>
      </ContentGridSurface>
    </>
  );
}
