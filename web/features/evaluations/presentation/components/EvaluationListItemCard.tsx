import Link from "next/link";

import type { Evaluation } from "@/features/evaluations/domain/entities/evaluation";

type EvaluationListItemCardProps = {
  schoolId: string;
  evaluation: Evaluation;
};

export default function EvaluationListItemCard({ schoolId, evaluation }: EvaluationListItemCardProps) {
  return (
    <Link
      href={`/${schoolId}/docente/evaluar/${evaluation.id}`}
      className="block rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)] transition-colors hover:bg-[#f1f7ff]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">{evaluation.evaluationTypeName}</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d]">{evaluation.name}</p>

          {evaluation.description ? (
            <p className="mt-2 text-sm text-[#4e7399]">{evaluation.description}</p>
          ) : (
            <p className="mt-2 text-sm text-[#7a96b5]">Sin descripcion.</p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#c7dbf1] bg-white px-3 py-1 text-xs font-medium text-[#315a85]">
              {evaluation.termName}
            </span>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#315a85]">Presentacion: {evaluation.presentationDate.slice(0, 10)}</p>
      </div>
    </Link>
  );
}
