"use client";

import { useState } from "react";

import type { EvaluationWeightLevel } from "@/features/academic/domain/entities/evaluation-weight";
import AppModal from "@/features/shared/components/modals/AppModal";

import CreateWeightConfigForm from "./CreateWeightConfigForm";
import UpdateWeightConfigForm from "./UpdateWeightConfigForm";

type ConfigureWeightLevelButtonProps = {
  schoolId: string;
  level: EvaluationWeightLevel;
};

export default function ConfigureWeightLevelButton({
  schoolId,
  level,
}: ConfigureWeightLevelButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 rounded-lg border border-[#c7dbf1] bg-white px-3 text-xs font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
      >
        {level.hasConfigured ? "Editar" : "Configurar"}
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title={level.hasConfigured ? "Editar ponderacion" : "Configurar ponderacion"}
        description={`Define los porcentajes de evaluacion para ${level.levelName}.`}
        size="lg"
      >
        {level.hasConfigured ? (
          <UpdateWeightConfigForm schoolId={schoolId} level={level} onClose={() => setOpen(false)} />
        ) : (
          <CreateWeightConfigForm schoolId={schoolId} level={level} onClose={() => setOpen(false)} />
        )}
      </AppModal>
    </>
  );
}
