import type {
  Evaluation,
  EvaluationTermOption,
  EvaluationTypeOption,
} from "@/features/evaluations/domain/entities/evaluation";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";

import DeleteEvaluationButton from "./DeleteEvaluationButton";
import EditEvaluationButton from "./EditEvaluationButton";
import FinalizeEvaluationButton from "./FinalizeEvaluationButton";

type EvaluationInfoCardProps = {
  schoolId: string;
  evaluation: Evaluation;
  typeOptions: EvaluationTypeOption[];
  termOptions: EvaluationTermOption[];
};

export default function EvaluationInfoCard({
  schoolId,
  evaluation,
  typeOptions,
  termOptions,
}: EvaluationInfoCardProps) {
  return (
    <AccentCard variant="softBlue" eyebrow="Informacion" title="Detalle de evaluacion" className="w-full">
      <div className="space-y-3 rounded-xl border border-[#c7dbf1] bg-white p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Titulo</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d]">{evaluation.name}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Descripcion</p>
          <p className="mt-1 text-sm text-[#4e7399]">{evaluation.description ?? "Sin descripcion."}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Tipo</p>
            <p className="mt-1 text-sm font-semibold text-[#315a85]">{evaluation.evaluationTypeName}</p>
          </div>
          <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Presentacion</p>
            <p className="mt-1 text-sm font-semibold text-[#315a85]">{evaluation.presentationDate.slice(0, 10)}</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Trimestre</p>
          <p className="mt-1 text-sm font-semibold text-[#315a85]">{evaluation.termName}</p>
        </div>

        <div className="rounded-lg border border-[#d5e3f3] bg-[#f8fbff] p-2.5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a8cb2]">Estado</p>
          <p className="mt-1 text-sm font-semibold text-[#315a85]">
            {evaluation.isClosed ? "Finalizada" : "Abierta"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <EditEvaluationButton
            schoolId={schoolId}
            evaluation={evaluation}
            typeOptions={typeOptions}
            termOptions={termOptions}
          />
          <DeleteEvaluationButton
            schoolId={schoolId}
            evaluation={evaluation}
            returnHref={`/${schoolId}/docente/evaluaciones/${evaluation.assignmentId}`}
          />
          <FinalizeEvaluationButton
            schoolId={schoolId}
            evaluationId={evaluation.id}
            disabled={evaluation.isClosed}
          />
        </div>
      </div>
    </AccentCard>
  );
}
