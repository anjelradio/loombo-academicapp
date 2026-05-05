import { Skeleton } from "@/components/ui/skeleton";

export default function SchoolPageHeaderSkeleton() {
  return (
    <header className="relative flex h-14 shrink-0 items-center gap-2 border-b border-[#2b5177]/65 bg-[#15385b] px-4 md:px-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(197,220,245,0.18)_1px,transparent_0)] bg-[size:3px_3px] opacity-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-44 bg-[radial-gradient(circle_at_right,rgba(126,176,238,0.24),transparent_70%)]" />

      <Skeleton className="relative z-10 h-8 w-8 rounded-md bg-[#2c567f]" />
      <Skeleton className="relative z-10 h-4 w-px bg-[#3c6690]" />
      <Skeleton className="relative z-10 h-4 w-24 bg-[#2c567f]" />
      <Skeleton className="relative z-10 h-4 w-3 bg-[#2c567f]" />
      <Skeleton className="relative z-10 h-4 w-28 bg-[#2c567f]" />
    </header>
  );
}
