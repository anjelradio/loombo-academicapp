import type { Invitation } from "@/features/school/domain/entities/invitation";
import { formatBoliviaDateTime } from "@/features/shared/infrastructure/date-time/date-time";
import InvitationCodeRowActions from "./InvitationCodeRowActions";

interface InvitationCodesTableProps {
  schoolId: string;
  items: Invitation[];
}

export default function InvitationCodesTable({ schoolId, items }: InvitationCodesTableProps) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
        Aun no hay codigos generados para esta escuela.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">Codigo</p>
              <p className="mt-1 text-base font-semibold text-[#1f4d7d]">{item.code}</p>
            </div>
            <InvitationCodeRowActions schoolId={schoolId} invitationId={item.id} code={item.code} />
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6a8cb2]">Rol</p>
              <p className="mt-1 text-[#274f78]">{item.role === "admin" ? "Administrativo" : "Profesor"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6a8cb2]">Estado</p>
              <p className={`mt-1 font-medium ${item.status === "active" ? "text-[#158f6a]" : "text-[#bc5c5c]"}`}>
                {item.status === "active" ? "Activo" : "Expirado"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6a8cb2]">Creado</p>
              <p className="mt-1 text-[#274f78]">{formatBoliviaDateTime(item.createdDate)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6a8cb2]">Expira</p>
              <p className="mt-1 text-[#274f78]">{formatBoliviaDateTime(item.expiresAt)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
