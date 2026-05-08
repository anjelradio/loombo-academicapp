import type { Term } from "@/features/academic/domain/entities/term";

import DeleteTermButton from "./DeleteTermButton";
import EditTermButton from "./EditTermButton";

type TermListItemCardProps = {
  schoolId: string;
  term: Term;
};

export default function TermListItemCard({ schoolId, term }: TermListItemCardProps) {
  return (
    <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 min-h-20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#1f4d7d]">{term.name}</p>
          <p className="mt-1 text-xs text-[#4e7399]">
            {term.startDate} - {term.endDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <EditTermButton schoolId={schoolId} term={term} />
          <DeleteTermButton schoolId={schoolId} term={term} />
        </div>
      </div>
    </div>
  );
}
