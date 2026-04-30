"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  disabled,
  pendingText = "Procesando...",
  type,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type ?? "submit"}
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      {...props}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
