import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { evaluationWeightRepository } from "@/features/academic/data/repositories";
import { termRepository } from "@/features/academic/data/repositories";
import EvaluationLevelListItemCard from "@/features/academic/presentation/components/evaluation-weights/EvaluationLevelListItemCard";
import RegisterTermButton from "@/features/academic/presentation/components/terms/RegisterTermButton";
import TermListItemCard from "@/features/academic/presentation/components/terms/TermListItemCard";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function PeriodosPonderacionPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;

  const [termsResponse, evaluationWeightsResponse] = await Promise.all([
    termRepository.getTermsBySchool(schoolId),
    evaluationWeightRepository.getEvaluationWeightsBySchool(schoolId),
  ]);

  if (!termsResponse.ok) {
    throw new Error(termsResponse.errors[0] ?? "Error al obtener los trimestres.");
  }

  if (!evaluationWeightsResponse.ok) {
    throw new Error(
      evaluationWeightsResponse.errors[0] ?? "Error al obtener las ponderaciones por nivel.",
    );
  }

  const terms = termsResponse.data;
  const evaluationLevels = evaluationWeightsResponse.data;

  return (
    <>
      <SchoolPageHeader section="Academico" page="Periodos y ponderacion" />
      <ContentGridSurface variant="diagonal">
        <PageHeading
          title="Periodos y ponderacion"
          description="Configura los trimestres escolares y la ponderacion de evaluacion por nivel academico."
          tone="light"
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen de trimestres"
              description="Vista general de periodos configurados para este colegio."
              items={[
                { label: "Trimestres", value: terms.length },
                {
                  label: "Activos",
                  value: terms.length,
                },
              ]}
            />

            <AccentCard variant="base" eyebrow="Trimestres" className="flex h-[430px] flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#143153]">Listado de trimestres</h3>
                <RegisterTermButton schoolId={schoolId} />
              </div>

              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-2 pb-1">
                  {terms.length ? (
                    terms.map((term) => (
                      <TermListItemCard key={term.id} schoolId={schoolId} term={term} />
                    ))
                  ) : (
                    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3 text-sm text-[#52749a]">
                      Aun no hay trimestres registrados.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </AccentCard>
          </div>

          <div className="space-y-4">
            <AccentCard variant="base" eyebrow="Ponderacion" className="flex h-[430px] flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#143153]">Niveles y ponderacion</h3>
              </div>

              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-2 pb-1">
                  {evaluationLevels.length ? (
                    evaluationLevels.map((level) => (
                      <EvaluationLevelListItemCard
                        key={level.schoolLevelId}
                        schoolId={schoolId}
                        level={level}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3 text-sm text-[#52749a]">
                      No hay niveles disponibles para configurar.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </AccentCard>

            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen de ponderacion"
              description="Estado general de configuracion de ponderaciones por nivel."
              items={[
                { label: "Niveles", value: evaluationLevels.length },
                {
                  label: "Configurados",
                  value: evaluationLevels.filter((item) => item.hasConfigured).length,
                },
              ]}
            />
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
