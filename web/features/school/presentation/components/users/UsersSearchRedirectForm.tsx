"use client";

import { useRouter } from "next/navigation";

import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";

type UsersSearchRedirectFormProps = {
  basePath: string;
  query?: string;
};

export default function UsersSearchRedirectForm({
  basePath,
  query = "",
}: UsersSearchRedirectFormProps) {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const name = ((formData.get("name") as string | null) ?? "").trim();
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  return (
    <form action={handleSubmit} className="mb-4 rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <FormTextField
          id="name"
          name="name"
          label="Nombre"
          defaultValue={query}
          placeholder="Ej: Juan Perez"
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
