"use client";

import { useState } from "react";

import type {
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import AppModal from "@/features/shared/components/modals/AppModal";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";

import CreateEvaluationForm from "./CreateEvaluationForm";

type RegisterEvaluationButtonProps = {
  schoolId: string;
  assignmentId: string;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
};

export default function RegisterEvaluationButton({
  schoolId,
  assignmentId,
  typeOptions,
  termOptions,
}: RegisterEvaluationButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryActionButton className="h-10 rounded-lg px-4 text-sm" onClick={() => setOpen(true)}>
        Registrar evaluacion
      </PrimaryActionButton>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Registrar evaluacion"
        description="Completa los datos para crear una nueva evaluacion en esta materia."
        size="xl"
      >
        <CreateEvaluationForm
          schoolId={schoolId}
          assignmentId={assignmentId}
          typeOptions={typeOptions}
          termOptions={termOptions}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </>
  );
}
