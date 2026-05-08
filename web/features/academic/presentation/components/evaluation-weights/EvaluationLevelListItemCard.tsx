import type { EvaluationWeightLevel } from "@/features/academic/domain/entities/evaluation-weight";

import ConfigureWeightLevelButton from "./ConfigureWeightLevelButton";

type EvaluationLevelListItemCardProps = {
  schoolId: string;
  level: EvaluationWeightLevel;
};

export default function EvaluationLevelListItemCard({
  schoolId,
  level,
}: EvaluationLevelListItemCardProps) {
  return (
    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 min-h-20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#1f4d7d]">{level.levelName}</p>
          <p className="mt-1 text-xs text-[#4e7399]">
            {level.hasConfigured ? "Configurado" : "Sin configurar"}
          </p>
        </div>

        <ConfigureWeightLevelButton schoolId={schoolId} level={level} />
      </div>
    </div>
  );
}
