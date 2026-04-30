import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type ModalSecondaryButtonProps = Omit<ComponentProps<typeof Button>, "type" | "variant">;

export function ModalSecondaryButton({ className, children, ...props }: ModalSecondaryButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("h-12 border-gray-300 text-gray-700 hover:bg-gray-50", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
