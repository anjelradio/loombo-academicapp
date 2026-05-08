"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { Evaluation } from "@/features/evaluations/domain/entities/evaluation";
import { deleteEvaluation } from "@/features/evaluations/presentation/actions/delete-evaluation-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type DeleteEvaluationButtonProps = {
  schoolId: string;
  evaluation: Evaluation;
  returnHref: string;
};

export default function DeleteEvaluationButton({
  schoolId,
  evaluation,
  returnHref,
}: DeleteEvaluationButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteEvaluation(schoolId, evaluation.id);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo eliminar la evaluacion");
        return;
      }

      appToast.success("Evaluacion eliminada correctamente");
      setOpen(false);
      router.push(returnHref);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg border border-[#f2c8c8] bg-white px-4 text-sm font-semibold text-[#b84f4f] hover:bg-[#fff5f5]"
      >
        Eliminar
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Eliminar evaluacion"
        description={`¿Estas seguro de eliminar "${evaluation.name}"?`}
        actionText={isPending ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onAction={handleDelete}
        actionDisabled={isPending}
      />
    </>
  );
}
