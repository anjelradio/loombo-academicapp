"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { finalizeEvaluation } from "@/features/students/presentation/actions/finalize-evaluation-action";
import AppAlertModal from "@/features/shared/components/modals/AppAlertModal";
import { appToast } from "@/features/shared/components/toast/toast";

type FinalizeEvaluationButtonProps = {
  schoolId: string;
  evaluationId: string;
  disabled?: boolean;
};

export default function FinalizeEvaluationButton({
  schoolId,
  evaluationId,
  disabled = false,
}: FinalizeEvaluationButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFinalize = () => {
    startTransition(async () => {
      const result = await finalizeEvaluation(schoolId, evaluationId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo finalizar la evaluacion");
        return;
      }

      appToast.success(`Evaluacion finalizada. Faltantes creados en cero: ${result.data?.createdMissing ?? 0}`);
      setOpen(false);
      router.refresh();
    });
  };

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="h-10 rounded-lg border border-[#c7dbf1] bg-white px-4 text-sm font-semibold text-[#345b86] opacity-70"
      >
        Evaluacion finalizada
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg bg-[#1E3A5F] px-4 text-sm font-semibold text-white hover:bg-[#152B47]"
      >
        Finalizar evaluacion
      </button>

      <AppAlertModal
        open={open}
        onOpenChange={setOpen}
        title="Finalizar evaluacion"
        description="Se completaran con cero los estudiantes sin calificar. Esta accion no se puede deshacer."
        actionText={isPending ? "Finalizando..." : "Finalizar"}
        cancelText="Cancelar"
        onAction={handleFinalize}
        actionDisabled={isPending}
      />
    </>
  );
}
