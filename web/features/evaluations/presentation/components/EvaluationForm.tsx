"use client";

import { useMemo, useState } from "react";

import type {
  Evaluation,
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import { FormDateField } from "@/features/shared/components/forms/FormDateField";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import SelectableChips from "@/features/shared/components/ui/SelectableChips";

type EvaluationFormProps = {
  assignmentId?: string;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
  evaluation?: Evaluation;
};

export default function EvaluationForm({
  assignmentId,
  typeOptions,
  termOptions,
  evaluation,
}: EvaluationFormProps) {
  const defaultTermId = useMemo(() => termOptions.find((term) => term.isActive)?.id ?? "", [termOptions]);

  const [selectedTypeId, setSelectedTypeId] = useState(evaluation?.evaluationTypeId ?? "");
  const [selectedTermId, setSelectedTermId] = useState(evaluation?.termId ?? defaultTermId);

  return (
    <div className="space-y-5">
      <FormTextField
        id="name"
        name="name"
        label="Titulo"
        placeholder="Ej: Examen parcial"
        defaultValue={evaluation?.name}
        required
      />

      <FormTextField
        id="description"
        name="description"
        label="Descripcion (opcional)"
        placeholder="Ej: Evaluacion del tema 3"
        defaultValue={evaluation?.description ?? ""}
      />

      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1E3A5F]">Tipo de evaluacion</p>
        <SelectableChips
          options={typeOptions.map((item) => ({ value: item.id, label: item.name }))}
          selectedValues={selectedTypeId ? [selectedTypeId] : []}
          onChange={(values) => setSelectedTypeId(values[0] ?? "")}
        />
      </div>

      <FormDateField
        id="presentationDate"
        name="presentationDate"
        label="Fecha de presentacion"
        defaultValue={evaluation?.presentationDate.slice(0, 10)}
        required
      />

      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1E3A5F]">Trimestre</p>
        <SelectableChips
          options={termOptions.map((item) => ({ value: item.id, label: item.name }))}
          selectedValues={selectedTermId ? [selectedTermId] : []}
          onChange={(values) => setSelectedTermId(values[0] ?? "")}
        />
      </div>

      <input type="hidden" name="evaluationTypeId" value={selectedTypeId} />
      <input type="hidden" name="termId" value={selectedTermId} />
      {assignmentId ? <input type="hidden" name="assignmentId" value={assignmentId} /> : null}
    </div>
  );
}
