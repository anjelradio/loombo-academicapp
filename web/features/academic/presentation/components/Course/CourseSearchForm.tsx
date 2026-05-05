"use client";

import { useRouter } from "next/navigation";

import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";

type CourseSearchFormProps = {
  basePath: string;
  defaultSearch: string;
};

export default function CourseSearchForm({ basePath, defaultSearch }: CourseSearchFormProps) {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const search = ((formData.get("search") as string | null) ?? "").trim();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  return (
    <form action={handleSubmit} className="mb-4 rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <FormTextField
          id="search"
          name="search"
          label="Buscar curso"
          defaultValue={defaultSearch}
          placeholder="Ej: Primero de Secundaria"
          wrapperClassName="space-y-1.5"
          labelClassName="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f82aa]"
          className="h-11"
        />

        <SubmitButton
          className="h-11 rounded-lg bg-[#1E3A5F] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#17304f]"
          pendingText="Buscando..."
        >
          Buscar
        </SubmitButton>
      </div>
    </form>
  );
}
