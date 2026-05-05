import { CalendarDays, Mail } from "lucide-react";

import SchoolUserRowActions from "@/features/school/presentation/components/users/SchoolUserRowActions";
import { formatBoliviaDateTime } from "@/features/shared/infrastructure/date-time/date-time";
import type { SchoolMember } from "@/features/school/domain/entities/school-member";

type UserListItemCardProps = {
  schoolId: string;
  item: SchoolMember;
  label: string;
};

export default function UserListItemCard({ schoolId, item, label }: UserListItemCardProps) {
  return (
    <article className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">{label}</p>
          <p className="mt-1 text-base font-semibold text-[#1f4d7d] md:text-lg">
            {item.firstName} {item.lastName}
          </p>
        </div>
        <SchoolUserRowActions schoolId={schoolId} userId={item.id} role={item.role} />
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="rounded-lg border border-[#cfe0f2] bg-white px-3 py-2.5">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-[#6a8cb2]">Correo institucional</p>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[#6a8cb2]" />
            <p className="break-all text-[#274f78]">{item.email}</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#cfe0f2] bg-white px-3 py-2.5 lg:min-w-56">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-[#6a8cb2]">Fecha de union</p>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-[#6a8cb2]" />
            <p className="text-sm font-medium text-[#274f78]">{formatBoliviaDateTime(item.createdDate)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
