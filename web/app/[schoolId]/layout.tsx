import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SchoolThemeBodyClass } from "@/components/layout/utils/SchoolThemeBodyClass";
import { SchoolHydrator } from "@/components/layout/utils/SchoolHydrator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
      <SidebarInset className="school-inset">
        <div className="flex flex-1 flex-col p-4">
          <div className="school-content-card flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-sidebar-border/70">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
