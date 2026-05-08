"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteTerm } from "@/features/academic/presentation/actions/terms/delete-term-action";
import type { Term } from "@/features/academic/domain/entities/term";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type DeleteTermButtonProps = {
  schoolId: string;
  term: Term;
};

export default function DeleteTermButton({ schoolId, term }: DeleteTermButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTerm(schoolId, term.id);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar el trimestre");
        return;
      }
      appToast.success("Trimestre eliminado correctamente");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-8 rounded-lg border border-[#f2c8c8] bg-white px-3 text-xs font-semibold text-[#b84f4f] hover:bg-[#fff5f5]"
      >
        Eliminar
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar trimestre"
        description={`¿Estas seguro de que quieres eliminar \"${term.name}\"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
