import SchoolPageHeaderSkeleton from "@/components/layout/school/SchoolPageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default function CursoDetalleLoading() {
  return (
    <>
      <SchoolPageHeaderSkeleton />

      <ContentGridSurface variant="north">
        <div>
          <Skeleton className="mb-3 h-4 w-32 bg-[#d4e3f3]" />
          <Skeleton className="h-10 w-60 bg-[#d4e3f3]" />
          <Skeleton className="mt-3 h-4 w-72 bg-[#dce9f6]" />
        </div>

        <section className="grid items-start gap-4 xl:grid-cols-[30%_70%]">
          <div className="space-y-4">
            <Skeleton className="h-[420px] w-full rounded-2xl bg-[#dbe8f5]" />
            <Skeleton className="h-56 w-full rounded-2xl bg-[#dbe8f5]" />
          </div>

          <Skeleton className="min-h-[420px] w-full rounded-2xl bg-[#dbe8f5]" />
        </section>
      </ContentGridSurface>
    </>
  );
}
