import InvitationGenerateCards from "@/features/school/presentation/components/invitation/InvitationGenerateCards";
import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import { invitationRepository } from "@/features/school/data/repositories/invitation.repository";
import InvitationCodesTable from "@/features/school/presentation/components/invitation/InvitationCodesTable";

export default async function InvitationUsersPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await invitationRepository.getSchoolInvitations(schoolId);
  const invitations = response.ok && "data" in response && response.data ? response.data : [];

  return (
    <>
      <SchoolPageHeader section="Usuarios" page="Invitaciones" />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeading
          title="Invitaciones"
          description="Crea y gestiona codigos de invitacion para personal administrativo y profesores. Cada codigo se genera segun el tipo de rol de destino."
        />

        <InvitationGenerateCards schoolId={schoolId} />

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-[#EAF2FF]">Codigos Activos</h2>
          <InvitationCodesTable schoolId={schoolId} items={invitations} />
        </section>
      </div>
    </>
  );
}
