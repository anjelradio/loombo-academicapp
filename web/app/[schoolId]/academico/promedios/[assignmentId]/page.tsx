import Link from "next/link";

import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { evaluationRepository } from "@/features/evaluations/data/repositories/evaluation.repository";
import CalculateTermAveragesButton from "@/features/evaluations/presentation/components/CalculateTermAveragesButton";
import TermAverageStudentsList from "@/features/evaluations/presentation/components/TermAverageStudentsList";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function AcademicoPromediosAssignmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string; assignmentId: string }>;
  searchParams: Promise<{ term?: string }>;
}) {
  const { schoolId, assignmentId } = await params;
  const { term } = await searchParams;

  const termOptionsResponse = await evaluationRepository.getTermAverageOptions(schoolId);
  if (!termOptionsResponse.ok) {
    throw new Error(termOptionsResponse.errors[0] ?? "No se pudieron obtener los trimestres.");
  }

  const termOptions = termOptionsResponse.data;
  const activeTerm = termOptions.find((item) => item.isActive) ?? termOptions[0] ?? null;
  const selectedTerm =
    termOptions.find((item) => item.name === term) ??
    activeTerm ??
    termOptions[0] ??
    null;

  const rowsResponse = selectedTerm
    ? await evaluationRepository.getTermAveragesByAssignment(schoolId, assignmentId, selectedTerm.id)
    : { ok: true as const, data: [] };

  if (!rowsResponse.ok) {
    throw new Error(rowsResponse.errors[0] ?? "No se pudieron obtener los promedios.");
  }

  const rows = rowsResponse.data;

  return (
    <>
      <SchoolPageHeader section="Academico" page="Promedios" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Promedios trimestrales"
          description="Listado base de estudiantes para el trimestre activo."
          tone="light"
          returnHref={`/${schoolId}/academico/promedios`}
          returnLabel="Volver a promedios"
        />

        <section className="grid items-start gap-5 xl:grid-cols-[70%_30%]">
          <AccentCard variant="base" eyebrow="Estudiantes" className="min-h-[580px] p-5">
            <TermAverageStudentsList rows={rows} />
          </AccentCard>

          <div className="space-y-5">
            <AccentCard variant="softBlue" eyebrow="Trimestres" title="Seleccion de trimestre">
              <div className="flex flex-wrap gap-2">
                {termOptions.map((term) => {
                  const isSelected = selectedTerm?.id === term.id;
                  return (
                    <Link
                      key={term.id}
                      href={`/${schoolId}/academico/promedios/${assignmentId}?term=${encodeURIComponent(term.name)}`}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isSelected
                          ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                          : "border-[#c7dbf1] bg-white text-[#355f89] hover:bg-[#f0f7ff]"
                      }`}
                    >
                      {term.name}
                    </Link>
                  );
                })}
              </div>
            </AccentCard>

            <AccentCard variant="base" eyebrow="Calculo" title="Resumen del trimestre seleccionado">
              <div className="space-y-3 rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3">
                <div className="flex items-center justify-between text-sm text-[#315a85]">
                  <span className="font-medium">Trimestre</span>
                  <span>{selectedTerm?.name ?? "--"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#315a85]">
                  <span className="font-medium">Estudiantes</span>
                  <span>{rows.length}</span>
                </div>
              </div>

              <CalculateTermAveragesButton
                schoolId={schoolId}
                assignmentId={assignmentId}
                termId={selectedTerm?.id ?? null}
              />
            </AccentCard>
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
