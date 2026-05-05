import SchoolPageHeaderSkeleton from "@/components/layout/school/SchoolPageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

function UserCardSkeleton() {
  return (
    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <Skeleton className="h-3 w-20 bg-[#c9dbee]" />
          <Skeleton className="mt-2 h-5 w-44 bg-[#b9cfe6]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md bg-[#c9dbee]" />
          <Skeleton className="h-8 w-8 rounded-md bg-[#c9dbee]" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
        <Skeleton className="h-14 w-full rounded-lg bg-[#dbe8f5]" />
        <Skeleton className="h-14 w-full rounded-lg bg-[#dbe8f5] lg:w-56" />
      </div>
    </div>
  );
}

export default function BuscarAdministradoresLoading() {
  return (
    <>
      <SchoolPageHeaderSkeleton />
      <ContentGridSurface variant="north">
        <div>
          <Skeleton className="h-10 w-72 bg-[#d4e3f3]" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl bg-[#dce9f6]" />
        </div>

        <section>
          <div className="rounded-2xl border border-[#d8e5f5] bg-white p-6">
            <Skeleton className="h-28 w-full rounded-xl bg-[#edf4fb]" />
            <div className="mt-4 space-y-3">
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </div>
          </div>
        </section>
      </ContentGridSurface>
    </>
  );
}
