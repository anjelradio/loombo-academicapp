import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import { schoolMembersRepository } from "@/features/school/data/repositories";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import AppPagination from "@/features/shared/components/navigation/AppPagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import UsersPlaceholderCard from "@/features/school/presentation/components/users/UsersPlaceholderCard";
import UserListItemCard from "@/features/school/presentation/components/users/UserListItemCard";
import UsersSearchRedirectForm from "@/features/school/presentation/components/users/UsersSearchRedirectForm";

export default async function ProfesoresPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { schoolId } = await params;
  const filters = await searchParams;
  const page = Number(filters.page ?? "1");
  const safePage = Number.isNaN(page) ? 1 : page;
  if (safePage < 1) redirect(`/${schoolId}/usuarios/profesores`);

  const pageSize = 8;
  const response = await schoolMembersRepository.getUsersBySchool(
    schoolId,
    "teacher",
    safePage,
    pageSize,
  );
  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener los profesores.");
  }

  const data = response.data;
  if (safePage > data.totalPages && data.totalPages > 0) {
    redirect(`/${schoolId}/usuarios/profesores`);
  }

  const users = data.users;
  const currentPage = data.page;
  const totalPages = data.totalPages;

  const basePath = `/${schoolId}/usuarios/profesores`;
  const searchPath = `/${schoolId}/usuarios/profesores/buscar`;

  return (
    <>
      <SchoolPageHeader section="Usuarios" page="Profesores" />

      <ContentGridSurface variant="diagonal">
        <PageHeading
          title="Profesores"
          description="Visualiza los docentes vinculados a esta escuela y prepara futuras acciones de gestion de roles."
          tone="light"
        />

        <section className="grid items-stretch gap-4 xl:grid-cols-[40%_60%]">
          <div className="flex h-full flex-col gap-4">
            <IndicatorsSummaryCard
              className="flex-1"
              eyebrow="Indicadores"
              title="Resumen de profesores"
              description="Visualiza rapidamente el estado del equipo docente y su ritmo de incorporacion."
              items={[
                { label: "Total", value: "--" },
                {
                  label: "Recientes",
                  value: "--",
                  hint: "pendiente de integrar",
                },
              ]}
            />

            <UsersPlaceholderCard
              className="flex-1"
              eyebrow="Contexto"
              title="Gestion del equipo"
              description="Esta seccion estara disponible en proximas entregas."
            />
          </div>

          <AccentCard
            variant="base"
            eyebrow="Listado"
            className="flex h-full flex-col p-6"
          >
            <UsersSearchRedirectForm basePath={searchPath} />

            <ScrollArea className="h-[400px] pr-3">
              <div className="space-y-3 pb-1">
                {users.length ? (
                  users.map((item) => (
                    <UserListItemCard
                      key={item.id}
                      schoolId={schoolId}
                      item={item}
                      label="Profesor"
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    No hay resultados para los filtros seleccionados.
                  </div>
                )}
              </div>
            </ScrollArea>

            <AppPagination
              page={currentPage}
              totalPages={totalPages}
              basePath={basePath}
              hasPrev={data.hasPrev}
              hasNext={data.hasNext}
            />
          </AccentCard>
        </section>
      </ContentGridSurface>
    </>
  );
}
