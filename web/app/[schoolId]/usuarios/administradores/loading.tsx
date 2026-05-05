import SchoolPageHeaderSkeleton from "@/components/layout/school/SchoolPageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default function AdministradoresLoading() {
  return (
    <>
      <SchoolPageHeaderSkeleton />
      <ContentGridSurface variant="north">
        <div>
          <Skeleton className="h-10 w-64 bg-[#d4e3f3]" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#dce9f6]" />
        </div>

        <section className="grid gap-4 xl:grid-cols-[40%_60%]">
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl bg-[#dbe8f5]" />
            <Skeleton className="h-40 w-full rounded-2xl bg-[#dbe8f5]" />
          </div>

          <div className="rounded-2xl border border-[#d8e5f5] bg-white p-6">
            <Skeleton className="h-28 w-full rounded-xl bg-[#edf4fb]" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl bg-[#edf4fb]" />
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
            </div>
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
