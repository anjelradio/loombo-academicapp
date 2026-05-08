"use client";

import { cn } from "@/features/shared/infrastructure/utils/cn";

type ChipOption = {
  value: string;
  label: string;
};

type SelectableChipsProps = {
  options: ChipOption[];
  selectedValues: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
  className?: string;
  readOnly?: boolean;
};

export default function SelectableChips({
  options,
  selectedValues,
  onChange,
  multiple = false,
  className,
  readOnly = false,
}: SelectableChipsProps) {
  const selectedSet = new Set(selectedValues);

  const toggleValue = (value: string) => {
    if (readOnly || !onChange) return;

    if (multiple) {
      if (selectedSet.has(value)) {
        onChange(selectedValues.filter((selectedValue) => selectedValue !== value));
        return;
      }
      onChange([...selectedValues, value]);
      return;
    }

    onChange([value]);
  };

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {options.map((option) => {
        const isSelected = selectedSet.has(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleValue(option.value)}
            disabled={readOnly}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2",
              readOnly
                ? "border-slate-300 bg-white text-slate-700"
                : isSelected
                  ? "border-[#1E3A5F] bg-[#1E3A5F] text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#1E3A5F] hover:text-[#1E3A5F]",
              readOnly && "cursor-default",
            )}
            aria-pressed={isSelected}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
