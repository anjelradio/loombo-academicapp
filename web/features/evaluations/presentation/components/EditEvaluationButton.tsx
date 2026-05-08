"use client";

import { useState } from "react";

import type {
  Evaluation,
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import AppModal from "@/features/shared/components/modals/AppModal";

import UpdateEvaluationForm from "./UpdateEvaluationForm";

type EditEvaluationButtonProps = {
  schoolId: string;
  evaluation: Evaluation;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
};

export default function EditEvaluationButton({
  schoolId,
  evaluation,
  typeOptions,
  termOptions,
}: EditEvaluationButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg border border-[#c7dbf1] bg-white px-4 text-sm font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
      >
        Editar
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar evaluacion"
        description="Actualiza la informacion de esta evaluacion."
        size="xl"
      >
        <UpdateEvaluationForm
          schoolId={schoolId}
          evaluation={evaluation}
          typeOptions={typeOptions}
          termOptions={termOptions}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
