import SchoolUsersTable from "@/features/school/presentation/components/users/SchoolUsersTable";
import PageHeading from "@/components/shared/PageHeading";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProfesoresPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await schoolRepository.getUsersBySchool(schoolId, "teacher");
  const users = response.ok && "data" in response && response.data ? response.data : [];

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-foreground hover:bg-sidebar-accent/60 hover:text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Usuarios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Profesores</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 bg-gradient-to-b from-[#08172D] via-[#0A1D35] to-[#071427] p-4 md:p-6">
        <PageHeading
          title="Profesores"
          description="Visualiza los docentes vinculados a esta escuela y prepara futuras acciones de gestion de roles."
        />

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-[#EAF2FF]">Lista de profesores</h2>
          <SchoolUsersTable schoolId={schoolId} items={users} />
        </section>
      </div>
    </>
  );
}
