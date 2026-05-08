import { redirect } from "next/navigation";

import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { assignmentRepository } from "@/features/academic/data/repositories";
import AssignmentTeacherListItemCard from "@/features/academic/presentation/components/assignment/AssignmentTeacherListItemCard";
import AssignmentTeacherSearchForm from "@/features/academic/presentation/components/assignment/AssignmentTeacherSearchForm";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import AppPagination from "@/features/shared/components/navigation/AppPagination";

export default async function AsignacionesPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { schoolId } = await params;
  const filters = await searchParams;

  const page = Number(filters.page ?? "1");
  const safePage = Number.isNaN(page) ? 1 : page;
  const search = (filters.search ?? "").trim();

  if (safePage < 1) {
    redirect(`/${schoolId}/academico/asignaciones`);
  }

  const pageSize = 9;
  const response = await assignmentRepository.getAssignmentTeachers(schoolId, safePage, pageSize, search);

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener los docentes para asignaciones.");
  }

  const data = response.data;
  if (safePage > data.totalPages && data.totalPages > 0) {
    redirect(`/${schoolId}/academico/asignaciones`);
  }

  return (
    <>
      <SchoolPageHeader section="Academico" page="Asignaciones" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Asignaciones"
          description="Consulta los docentes y administra en que cursos imparten materias dentro de tu escuela."
          tone="light"
        />

        <section className="grid items-stretch gap-4 2xl:grid-cols-[70%_30%]">
          <AccentCard variant="base" eyebrow="Listado" className="flex h-full flex-col p-6">
            <AssignmentTeacherSearchForm
              basePath={`/${schoolId}/academico/asignaciones`}
              defaultSearch={search}
            />

            <ScrollArea className="h-[430px] pr-3">
              <div className="space-y-3 pb-1">
                {data.teachers.length ? (
                  data.teachers.map((teacher) => (
                    <AssignmentTeacherListItemCard key={teacher.teacherId} schoolId={schoolId} teacher={teacher} />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    No hay docentes para los filtros seleccionados.
                  </div>
                )}
              </div>
            </ScrollArea>

            <AppPagination
              page={data.page}
              totalPages={data.totalPages}
              basePath={`/${schoolId}/academico/asignaciones`}
              hasPrev={data.hasPrev}
              hasNext={data.hasNext}
              query={{ search }}
            />
          </AccentCard>

          <div className="flex min-w-0 flex-col gap-4">
            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen de asignaciones"
              description="Estos indicadores se conectaran con metricas reales en una siguiente iteracion."
              items={[
                { label: "Docentes con asignaciones", value: "--" },
                { label: "Docentes sin asignaciones", value: "--" },
              ]}
              className="w-full"
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Estado"
              title="Implementacion en curso"
              description="Pronto se habilitara la configuracion detallada de asignaciones por docente."
              className="w-full"
            />
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
