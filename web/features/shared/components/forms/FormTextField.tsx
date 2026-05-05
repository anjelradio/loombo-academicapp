import type { ComponentProps, ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type FormTextFieldProps = {
  id: string;
  name: string;
  label: string;
  wrapperClassName?: string;
  labelClassName?: string;
  rightSlot?: ReactNode;
} & ComponentProps<typeof Input>;

export function FormTextField({
  id,
  name,
  label,
  wrapperClassName,
  labelClassName,
  rightSlot,
  className,
  ...inputProps
}: FormTextFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", wrapperClassName)}>
      <Label htmlFor={id} className={cn("text-sm font-medium text-slate-700", labelClassName)}>
        {label}
      </Label>
      <div className={rightSlot ? "relative" : undefined}>
        <Input
          id={id}
          name={name}
          className={cn(
            "h-12 rounded-xl border-slate-300/90 bg-white px-3.5 text-[15px] text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-[#1E3A5F]/40 hover:shadow-md focus-visible:border-[#1E3A5F] focus-visible:ring-4 focus-visible:ring-[#1E3A5F]/20",
            className,
          )}
          {...inputProps}
        />
        {rightSlot}
      </div>
    </div>
  );
}
