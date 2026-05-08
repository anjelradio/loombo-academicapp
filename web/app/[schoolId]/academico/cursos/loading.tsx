import SchoolPageHeaderSkeleton from "@/components/layout/school/SchoolPageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

function CourseCardSkeleton() {
  return <Skeleton className="h-24 w-full rounded-xl bg-[#edf4fb]" />;
}

export default function CursosLoading() {
  return (
    <>
      <SchoolPageHeaderSkeleton />

      <ContentGridSurface variant="north">
        <div>
          <Skeleton className="h-10 w-44 bg-[#d4e3f3]" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#dce9f6]" />
        </div>

        <section className="space-y-4">
          <div className="rounded-2xl border border-[#d8e5f5] bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <Skeleton className="h-10 w-44 rounded-lg bg-[#dbe8f5]" />
              <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-md">
                <Skeleton className="h-14 w-full rounded-xl bg-[#dbe8f5]" />
                <Skeleton className="h-14 w-full rounded-xl bg-[#dbe8f5]" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8e5f5] bg-white p-6">
            <Skeleton className="h-28 w-full rounded-xl bg-[#edf4fb]" />

            <div className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
            </div>
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
