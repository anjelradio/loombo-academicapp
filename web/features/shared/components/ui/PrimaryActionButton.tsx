import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type PrimaryActionButtonProps = ComponentProps<typeof Button>;

export default function PrimaryActionButton({ className, children, ...props }: PrimaryActionButtonProps) {
  return (
    <Button
      type="button"
      className={cn(
        "h-12 rounded-xl bg-[#173A63] px-5 text-base font-semibold text-white hover:bg-[#12314f]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
