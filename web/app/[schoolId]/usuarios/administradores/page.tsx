import SchoolUsersTable from "@/features/school/presentation/components/users/SchoolUsersTable";
import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";

export default async function AdministradoresPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await schoolRepository.getUsersBySchool(schoolId, "admin");
  const users = response.ok && "data" in response && response.data ? response.data : [];

  return (
    <>
      <SchoolPageHeader section="Usuarios" page="Administradores" />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeading
          title="Administradores"
          description="Visualiza el personal administrativo vinculado a esta escuela y prepara futuras acciones de gestion de roles."
        />

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-[#EAF2FF]">Lista de administradores</h2>
          <SchoolUsersTable schoolId={schoolId} items={users} />
        </section>
      </div>
    </>
  );
}
