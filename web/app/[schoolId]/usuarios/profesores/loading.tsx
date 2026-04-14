import SchoolUsersTableSkeleton from "@/features/school/presentation/components/users/SchoolUsersTableSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfesoresLoading() {
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
              <Skeleton className="h-4 w-16 bg-[#29476A]" />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Skeleton className="h-4 w-24 bg-[#29476A]" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 bg-gradient-to-b from-[#08172D] via-[#0A1D35] to-[#071427] p-4 md:p-6">
        <section>
          <Skeleton className="h-9 w-48 bg-[#2C4B70]" />
          <Skeleton className="mt-3 h-4 w-full max-w-3xl bg-[#223E60]" />
        </section>

        <SchoolUsersTableSkeleton />
      </div>
    </>
  );
}
