import InviteGenerateCards from "@/components/invitar/InviteGenerateCards";
import PageHeading from "@/components/shared/PageHeading";
import { getSchoolInvites } from "@/lib/api/invite-api";
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
import InviteCodesTable from "@/components/invitar/InviteCodesTable";

export default async function InviteUsersPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const invites = await getSchoolInvites(schoolId);

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
              <BreadcrumbPage>Invitaciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 bg-gradient-to-b from-[#08172D] via-[#0A1D35] to-[#071427] p-4 md:p-6">
        <PageHeading
          title="Invitaciones"
          description="Crea y gestiona codigos de invitacion para personal administrativo y profesores. Cada codigo se genera segun el tipo de rol de destino."
        />

        <InviteGenerateCards schoolId={schoolId} />

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-[#EAF2FF]">Codigos Activos</h2>
          <InviteCodesTable schoolId={schoolId} items={invites} />
        </section>
      </div>
    </>
  );
}
