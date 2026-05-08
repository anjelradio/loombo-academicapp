import type { EvaluationWeightLevel } from "@/features/academic/domain/entities/evaluation-weight";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";

type WeightConfigFormProps = {
  level: EvaluationWeightLevel;
};

export default function WeightConfigForm({ level }: WeightConfigFormProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3 text-sm text-[#4e7399]">
        Nivel: <span className="font-semibold text-[#1f4d7d]">{level.levelName}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormTextField
          id="ser"
          name="ser"
          type="number"
          min={0}
          max={100}
          label="Ser (%)"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={level.ser ?? ""}
          required
        />

        <FormTextField
          id="saber"
          name="saber"
          type="number"
          min={0}
          max={100}
          label="Saber (%)"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={level.saber ?? ""}
          required
        />

        <FormTextField
          id="hacer"
          name="hacer"
          type="number"
          min={0}
          max={100}
          label="Hacer (%)"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={level.hacer ?? ""}
          required
        />

        <FormTextField
          id="autoevaluacion"
          name="autoevaluacion"
          type="number"
          min={0}
          max={100}
          label="Autoevaluacion (%)"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={level.autoevaluacion ?? ""}
          required
        />
      </div>
    </div>
  );
}
