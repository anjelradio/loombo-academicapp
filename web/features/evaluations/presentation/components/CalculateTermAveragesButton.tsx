"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { calculateTermAverages } from "@/features/evaluations/presentation/actions/calculate-term-averages-action";
import { appToast } from "@/features/shared/components/toast/toast";

type CalculateTermAveragesButtonProps = {
  schoolId: string;
  assignmentId: string;
  termId: string | null;
};

export default function CalculateTermAveragesButton({
  schoolId,
  assignmentId,
  termId,
}: CalculateTermAveragesButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCalculate = () => {
    if (!termId) {
      appToast.error("Selecciona un trimestre para calcular");
      return;
    }

    startTransition(async () => {
      const result = await calculateTermAverages(schoolId, assignmentId, termId);
      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudieron calcular los promedios");
        return;
      }

      appToast.success("Promedios calculados correctamente");
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      disabled={isPending || !termId}
      onClick={handleCalculate}
      className="mt-3 h-10 w-full rounded-lg bg-[#1E3A5F] px-4 text-sm font-semibold text-white hover:bg-[#152B47] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Calculando..." : "Calcular"}
    </button>
  );
}
