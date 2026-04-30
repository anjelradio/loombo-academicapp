import { Invitation } from "@/features/school/domain/entities/invitation";
import { formatBoliviaDateTime } from "@/features/shared/infrastructure/date-time/date-time";
import InvitationCodeRowActions from "./InvitationCodeRowActions";

interface InvitationCodesTableProps {
  schoolId: string;
  items: Invitation[];
}

export default function InvitationCodesTable({ schoolId, items }: InvitationCodesTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-[#2A4369]/60 bg-[#10233D]/90 md:block">
        <table className="w-full min-w-[720px] border-collapse">
          <thead className="bg-[#182F4F] text-left">
            <tr className="text-xs tracking-wide text-[#9CB3D1] uppercase">
              <th className="px-6 py-4 font-semibold">Codigo de invitacion</th>
              <th className="px-6 py-4 font-semibold">Rol</th>
              <th className="px-6 py-4 font-semibold">Fecha de creacion</th>
              <th className="px-6 py-4 font-semibold">Fecha de expiracion</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-[#243F63] bg-[#10233D]/90">
                <td className="px-6 py-5 text-base font-semibold text-[#35D6DF]">{item.code}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full border border-[#36557B] bg-[#1A304D] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D5E4F7]">
                    {item.role === "admin" ? "Administrativo" : "Profesor"}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-[#C7D7EA]">
                  {formatBoliviaDateTime(item.createdDate)}
                </td>
                <td className="px-6 py-5 text-sm text-[#C7D7EA]">
                  {formatBoliviaDateTime(item.expiresAt)}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-medium ${
                      item.status === "active" ? "text-[#3AD8A1]" : "text-[#F59E9E]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.status === "active" ? "bg-[#3AD8A1]" : "bg-[#F59E9E]"
                      }`}
                    />
                    {item.status === "active" ? "Activo" : "Expirado"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <InvitationCodeRowActions
                    schoolId={schoolId}
                    invitationId={item.id}
                    code={item.code}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-[#2A4369]/60 bg-[#10233D]/90 p-4 shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-semibold text-[#35D6DF]">{item.code}</p>
              <InvitationCodeRowActions
                schoolId={schoolId}
                invitationId={item.id}
                code={item.code}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Rol</p>
                <p className="mt-1 text-[#E2ECF9]">
                  {item.role === "admin" ? "Administrativo" : "Profesor"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Estado</p>
                <p className={`mt-1 ${item.status === "active" ? "text-[#3AD8A1]" : "text-[#F59E9E]"}`}>
                  {item.status === "active" ? "Activo" : "Expirado"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Fecha de creacion</p>
                <p className="mt-1 text-[#E2ECF9]">{formatBoliviaDateTime(item.createdDate)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Fecha de expiracion</p>
                <p className="mt-1 text-[#E2ECF9]">{formatBoliviaDateTime(item.expiresAt)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
