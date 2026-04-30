import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type SecondaryButtonProps = Omit<ComponentProps<typeof Button>, "type" | "variant"> & {
  type?: ComponentProps<typeof Button>["type"];
};

export function SecondaryButton({
  className,
  type = "button",
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      type={type}
      variant="outline"
      className={cn("h-11 border-gray-300 text-gray-700 hover:bg-gray-100", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
