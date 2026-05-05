import SubjectDeleteButton from "@/features/academic/presentation/components/Subject/SubjectDeleteButton";
import SubjectEditButton from "@/features/academic/presentation/components/Subject/SubjectEditButton";
import type { Subject } from "@/features/academic/domain/entities/subject";

type SubjectListItemCardProps = {
  schoolId: string;
  subject: Subject;
};

function getSubjectInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "MT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function SubjectListItemCard({ schoolId, subject }: SubjectListItemCardProps) {
  const initials = getSubjectInitials(subject.name);

  return (
    <article className="group flex min-h-40 flex-col justify-between rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_38px_-30px_rgba(10,31,61,0.55)]">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white text-sm font-semibold tracking-wide text-[#2b5f97]">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#6a8cb2]">Materia</p>
          <p className="mt-1 truncate text-lg font-semibold text-[#1f4d7d]">{subject.name}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-[#d5e3f3] pt-3">
        <SubjectEditButton schoolId={schoolId} subjectId={subject.id} currentName={subject.name} />
        <SubjectDeleteButton schoolId={schoolId} subjectId={subject.id} subjectName={subject.name} />
      </div>
    </article>
  );
}
