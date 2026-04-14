import { Skeleton } from "@/components/ui/skeleton";

export default function SchoolUsersTableSkeleton() {
  return (
    <section className="space-y-3">
      <Skeleton className="h-8 w-60 bg-[#2C4B70]" />

      <div className="hidden overflow-hidden rounded-xl border border-[#2A4369]/60 md:block">
        <div className="grid grid-cols-5 gap-4 border-b border-[#2A4369]/60 bg-[#182F4F] p-4">
          <Skeleton className="h-4 w-16 bg-[#35557A]" />
          <Skeleton className="h-4 w-18 bg-[#35557A]" />
          <Skeleton className="h-4 w-10 bg-[#35557A]" />
          <Skeleton className="h-4 w-24 bg-[#35557A]" />
          <Skeleton className="h-4 w-16 bg-[#35557A]" />
        </div>
        <div className="space-y-0 bg-[#10233D]/90 p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 border-t border-[#243F63] p-4">
              <Skeleton className="h-5 w-20 bg-[#29476A]" />
              <Skeleton className="h-5 w-24 bg-[#29476A]" />
              <Skeleton className="h-5 w-24 bg-[#29476A]" />
              <Skeleton className="h-5 w-32 bg-[#29476A]" />
              <Skeleton className="h-5 w-16 bg-[#29476A]" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#2A4369]/60 bg-[#10233D]/90 p-4"
          >
            <Skeleton className="h-5 w-40 bg-[#29476A]" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full bg-[#223E60]" />
              <Skeleton className="h-10 w-full bg-[#223E60]" />
              <Skeleton className="h-10 w-full bg-[#223E60]" />
              <Skeleton className="h-10 w-full bg-[#223E60]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
