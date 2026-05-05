import SchoolPageHeaderSkeleton from "@/components/layout/school/SchoolPageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

function SubjectCardSkeleton() {
  return <Skeleton className="h-24 w-full rounded-xl bg-[#edf4fb]" />;
}

export default function MateriasLoading() {
  return (
    <>
      <SchoolPageHeaderSkeleton />

      <ContentGridSurface variant="mist">
        <div>
          <Skeleton className="h-10 w-48 bg-[#d4e3f3]" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#dce9f6]" />
        </div>

        <section className="grid items-stretch gap-4 2xl:grid-cols-[70%_30%]">
          <div className="rounded-2xl border border-[#d8e5f5] bg-white p-6">
            <Skeleton className="h-28 w-full rounded-xl bg-[#edf4fb]" />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SubjectCardSkeleton key={i} />
              ))}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
              <Skeleton className="h-9 w-9 rounded-lg bg-[#dbe8f5]" />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <Skeleton className="h-72 w-full rounded-2xl bg-[#dbe8f5]" />
            <Skeleton className="h-56 w-full rounded-2xl bg-[#dbe8f5]" />
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
