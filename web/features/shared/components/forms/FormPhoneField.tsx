import type { ComponentProps } from "react";

import { cn } from "@/features/shared/infrastructure/utils/cn";

import { FormTextField } from "./FormTextField";

type FormPhoneFieldProps = Omit<ComponentProps<typeof FormTextField>, "type">;

export function FormPhoneField(props: FormPhoneFieldProps) {
  const { className, ...rest } = props;

  return (
    <FormTextField
      type="tel"
      className={cn("h-12 text-base border-gray-300", className)}
      {...rest}
    />
  );
}
