import type { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type ContentGridSurfaceVariant = "mist" | "north" | "diagonal";

type ContentGridSurfaceProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: ContentGridSurfaceVariant;
};

const overlayByVariant: Record<ContentGridSurfaceVariant, string> = {
  mist: "bg-[radial-gradient(circle_at_12%_14%,rgba(238,244,251,0.96),rgba(238,244,251,0.66)_32%,transparent_55%),radial-gradient(circle_at_92%_86%,rgba(238,244,251,0.94),rgba(238,244,251,0.52)_30%,transparent_54%),linear-gradient(145deg,rgba(255,255,255,0.65),rgba(255,255,255,0)_40%)]",
  north:
    "bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.9),rgba(238,244,251,0.58)_28%,transparent_52%),radial-gradient(circle_at_84%_92%,rgba(255,255,255,0.78),rgba(238,244,251,0.46)_24%,transparent_50%)]",
  diagonal:
    "bg-[linear-gradient(155deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.22)_36%,transparent_58%),radial-gradient(circle_at_88%_16%,rgba(238,244,251,0.88),rgba(238,244,251,0.4)_32%,transparent_56%)]",
};

export function ContentGridSurface({
  children,
  className,
  contentClassName,
  variant = "mist",
}: ContentGridSurfaceProps) {
  return (
    <div className={cn("relative flex flex-1 flex-col overflow-hidden bg-[#eef4fb]", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(20,49,83,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,49,83,0.08)_1px,transparent_1px)] bg-[size:26px_26px]" />
      <div className={cn("pointer-events-none absolute inset-0", overlayByVariant[variant])} />

      <ScrollArea className="relative z-10 flex-1">
        <div className={cn("flex min-h-full flex-col gap-6 p-4 md:p-6", contentClassName)}>{children}</div>
      </ScrollArea>
    </div>
  );
}
