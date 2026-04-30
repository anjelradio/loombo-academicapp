import { SchoolMember } from "@/features/school/domain/entities/school-member";
import { formatBoliviaDateTime } from "@/features/shared/infrastructure/date-time/date-time";

import SchoolUserRowActions from "./SchoolUserRowActions";

interface SchoolUsersTableProps {
  schoolId: string;
  items: SchoolMember[];
}

function roleLabel(role: string) {
  if (role === "admin") return "ADMINISTRADOR";
  if (role === "teacher") return "PROFESOR";
  return "DIRECTOR";
}

export default function SchoolUsersTable({ schoolId, items }: SchoolUsersTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-white/12 bg-[#0E213A]/85 md:block">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="bg-[#173251] text-left">
            <tr className="text-xs tracking-wide text-[#9CB3D1] uppercase">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Apellido</th>
              <th className="px-6 py-4 font-semibold">Rol</th>
              <th className="px-6 py-4 font-semibold">Fecha de union</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-[#294568] bg-[#0E213A]/85">
                <td className="px-6 py-5 text-sm font-semibold text-[#E6F0FF]">{item.firstName}</td>
                <td className="px-6 py-5 text-sm text-[#D5E4F7]">{item.lastName}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full border border-[#36557B] bg-[#1A304D] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D5E4F7]">
                    {roleLabel(item.role)}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-[#C7D7EA]">
                  {formatBoliviaDateTime(item.createdDate)}
                </td>
                <td className="px-6 py-5">
                  <SchoolUserRowActions schoolId={schoolId} userId={item.id} role={item.role} />
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
            className="rounded-xl border border-white/12 bg-[#0E213A]/85 p-4 shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-semibold text-[#E6F0FF]">
                {item.firstName} {item.lastName}
              </p>
              <SchoolUserRowActions schoolId={schoolId} userId={item.id} role={item.role} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Nombre</p>
                <p className="mt-1 text-[#E2ECF9]">{item.firstName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Apellido</p>
                <p className="mt-1 text-[#E2ECF9]">{item.lastName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Rol</p>
                <p className="mt-1 text-[#E2ECF9]">{roleLabel(item.role)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#95A9C6]">Fecha de union</p>
                <p className="mt-1 text-[#E2ECF9]">{formatBoliviaDateTime(item.createdDate)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
