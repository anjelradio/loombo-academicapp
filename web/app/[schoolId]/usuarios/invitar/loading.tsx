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

function InviteCardSkeleton() {
  return (
    <div className="rounded-xl border border-[#2A4369]/70 bg-[#10233D]/90 p-6">
      <Skeleton className="h-12 w-12 rounded-xl bg-[#29476A]" />
      <Skeleton className="mt-5 h-8 w-4/5 bg-[#29476A]" />
      <Skeleton className="mt-4 h-4 w-full bg-[#223E60]" />
      <Skeleton className="mt-2 h-4 w-11/12 bg-[#223E60]" />
      <Skeleton className="mt-2 h-4 w-3/4 bg-[#223E60]" />
      <Skeleton className="mt-6 h-12 w-full bg-[#29476A]" />
    </div>
  );
}

export default function InviteUsersLoading() {
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
                <Skeleton className="h-4 w-20 bg-[#29476A]" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 bg-gradient-to-b from-[#08172D] via-[#0A1D35] to-[#071427] p-4 md:p-6">
        <section>
          <Skeleton className="h-9 w-56 bg-[#2C4B70]" />
          <Skeleton className="mt-3 h-4 w-full max-w-3xl bg-[#223E60]" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-2xl bg-[#223E60]" />
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <InviteCardSkeleton />
          <InviteCardSkeleton />
        </section>

        <section className="space-y-3">
          <Skeleton className="h-8 w-52 bg-[#2C4B70]" />

          <div className="hidden overflow-hidden rounded-xl border border-[#2A4369]/60 md:block">
            <div className="grid grid-cols-6 gap-4 border-b border-[#2A4369]/60 bg-[#182F4F] p-4">
              <Skeleton className="h-4 w-24 bg-[#35557A]" />
              <Skeleton className="h-4 w-12 bg-[#35557A]" />
              <Skeleton className="h-4 w-20 bg-[#35557A]" />
              <Skeleton className="h-4 w-20 bg-[#35557A]" />
              <Skeleton className="h-4 w-14 bg-[#35557A]" />
              <Skeleton className="h-4 w-16 bg-[#35557A]" />
            </div>
            <div className="space-y-0 bg-[#10233D]/90 p-0">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 border-t border-[#243F63] p-4">
                  <Skeleton className="h-5 w-28 bg-[#29476A]" />
                  <Skeleton className="h-5 w-24 bg-[#29476A]" />
                  <Skeleton className="h-5 w-28 bg-[#29476A]" />
                  <Skeleton className="h-5 w-28 bg-[#29476A]" />
                  <Skeleton className="h-5 w-20 bg-[#29476A]" />
                  <Skeleton className="h-5 w-16 bg-[#29476A]" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#2A4369]/60 bg-[#10233D]/90 p-4"
              >
                <Skeleton className="h-5 w-32 bg-[#29476A]" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Skeleton className="h-10 w-full bg-[#223E60]" />
                  <Skeleton className="h-10 w-full bg-[#223E60]" />
                  <Skeleton className="col-span-2 h-10 w-full bg-[#223E60]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
