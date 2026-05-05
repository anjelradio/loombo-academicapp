import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserListItemCard from "@/features/school/presentation/components/users/UserListItemCard";
import UsersSearchRedirectForm from "@/features/school/presentation/components/users/UsersSearchRedirectForm";

export default async function BuscarProfesoresPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { schoolId } = await params;
  const filters = await searchParams;
  const query = (filters.name ?? "").trim();

  const response = await schoolRepository.getUsersBySchool(
    schoolId,
    "teacher",
    1,
    50,
    query,
  );
  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al buscar profesores.");
  }

  const users = response.data.users;
  const searchPath = `/${schoolId}/usuarios/profesores/buscar`;

  return (
    <>
      <SchoolPageHeader section="Usuarios" page="Buscar profesores" />

      <ContentGridSurface variant="diagonal">
        <PageHeading
          title="Buscar profesores"
          description="Encuentra docentes por nombre dentro de esta escuela."
          tone="light"
          returnHref={`/${schoolId}/usuarios/profesores`}
        />

        <section>
          <AccentCard variant="base" eyebrow="Listado" className="flex h-full flex-col p-6">
            <UsersSearchRedirectForm basePath={searchPath} query={query} />

            <ScrollArea className="h-[400px] pr-3">
              <div className="space-y-3 pb-1">
                {users.length ? (
                  users.map((item) => (
                    <UserListItemCard key={item.id} schoolId={schoolId} item={item} label="Profesor" />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    No hay resultados para la busqueda actual.
                  </div>
                )}
              </div>
            </ScrollArea>
          </AccentCard>
        </section>
      </ContentGridSurface>
    </>
  );
}
