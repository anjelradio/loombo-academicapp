import type { ComponentProps } from "react";

import { cn } from "@/features/shared/infrastructure/utils/cn";

import { FormTextField } from "./FormTextField";

type FormDateFieldProps = Omit<ComponentProps<typeof FormTextField>, "type">;

export function FormDateField(props: FormDateFieldProps) {
  const { className, ...rest } = props;

  return (
    <FormTextField
      type="date"
      className={cn("h-12 border-gray-300 bg-white text-gray-900 [color-scheme:light]", className)}
      {...rest}
    />
  );
}
