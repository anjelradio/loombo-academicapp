import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SchoolThemeBodyClass } from "@/components/layout/utils/SchoolThemeBodyClass";
import { SchoolHydrator } from "@/components/layout/utils/SchoolHydrator";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import { redirect } from "next/navigation";
export default async function ViewsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await schoolRepository.getSchoolsByUser();
  if (!response.ok || !("data" in response) || !response.data) {
    redirect("/");
  }

  const schools = response.data;
  const school = schools.find((school) => school.id === schoolId);
  if (!school) redirect("/");
  return (
    <SidebarProvider className="school-theme">
      <SchoolThemeBodyClass />
      <SchoolHydrator school={school} />

      <AppSidebar />
      <SidebarInset className="school-inset relative overflow-hidden bg-transparent">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(145,191,255,0.2),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(173,206,245,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(173,206,245,0.09)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
