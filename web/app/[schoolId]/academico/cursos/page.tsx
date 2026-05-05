import { redirect } from "next/navigation";

import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { courseRepository } from "@/features/academic/data/repositories/course.repository";
import CourseListItemCard from "@/features/academic/presentation/components/Course/CourseListItemCard";
import RegisterCourseButton from "@/features/academic/presentation/components/Course/RegisterCourseButton";
import CourseSearchForm from "@/features/academic/presentation/components/Course/CourseSearchForm";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import AppPagination from "@/features/shared/components/navigation/AppPagination";

export default async function CursosPage({
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
    redirect(`/${schoolId}/academico/cursos`);
  }

  const pageSize = 8;
  const response = await courseRepository.getCoursesBySchool(
    schoolId,
    safePage,
    pageSize,
    search,
  );

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener los cursos.");
  }

  const optionsResponse = await courseRepository.getCourseFormOptions(schoolId);
  if (!optionsResponse.ok) {
    throw new Error(
      optionsResponse.errors[0] ?? "Error al obtener las opciones de registro de cursos.",
    );
  }

  const data = response.data;
  if (safePage > data.totalPages && data.totalPages > 0) {
    redirect(`/${schoolId}/academico/cursos`);
  }

  return (
    <>
      <SchoolPageHeader section="Academico" page="Cursos" />
      <ContentGridSurface variant="north">
        <PageHeading
          title="Cursos"
          description="Visualiza los cursos registrados y prepara su gestion academica por nivel."
          tone="light"
        />

        <section className="space-y-4">
          <AccentCard
            variant="softBlue"
            eyebrow="Preparacion"
            className="p-4"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <RegisterCourseButton schoolId={schoolId} formOptions={optionsResponse.data} />

              <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-md">
                <div className="rounded-xl border border-[#c7dbf1] bg-white px-3 py-1.5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#5f82aa]">Activos</p>
                  <p className="mt-0.5 text-xl font-semibold text-[#15365a]">--</p>
                </div>
                <div className="rounded-xl border border-[#c7dbf1] bg-white px-3 py-1.5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#5f82aa]">Inactivos</p>
                  <p className="mt-0.5 text-xl font-semibold text-[#15365a]">--</p>
                </div>
              </div>
            </div>
          </AccentCard>

          <AccentCard variant="base" eyebrow="Listado" className="flex h-full flex-col p-6">
            <CourseSearchForm basePath={`/${schoolId}/academico/cursos`} defaultSearch={search} />

            <ScrollArea className="h-[360px] pr-3">
              <div className="space-y-3 pb-1">
                {data.courses.length ? (
                  data.courses.map((course) => (
                    <CourseListItemCard
                      key={course.id}
                      schoolId={schoolId}
                      course={course}
                      formOptions={optionsResponse.data}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    No se han hallado cursos registrados.
                  </div>
                )}
              </div>
            </ScrollArea>

            <AppPagination
              page={data.page}
              totalPages={data.totalPages}
              basePath={`/${schoolId}/academico/cursos`}
              hasPrev={data.hasPrev}
              hasNext={data.hasNext}
              query={{ search }}
            />
          </AccentCard>
        </section>
      </ContentGridSurface>
    </>
  );
}
