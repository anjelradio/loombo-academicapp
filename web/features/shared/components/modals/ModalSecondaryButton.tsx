import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type ModalSecondaryButtonProps = Omit<ComponentProps<typeof Button>, "type" | "variant">;

export function ModalSecondaryButton({ className, children, ...props }: ModalSecondaryButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-12 !border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-100 hover:!text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
