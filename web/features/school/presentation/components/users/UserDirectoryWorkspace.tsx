import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import SchoolUserRowActions from "@/features/school/presentation/components/users/SchoolUserRowActions";
import { formatBoliviaDateTime } from "@/features/shared/infrastructure/date-time/date-time";
import type { SchoolMember } from "@/features/school/domain/entities/school-member";
import { CalendarDays, Mail } from "lucide-react";

type JoinedPreset = "all" | "this_month" | "last_month" | "last_3_months";

type UserDirectoryWorkspaceProps = {
  schoolId: string;
  roleLabel: "Profesores" | "Administradores";
  items: SchoolMember[];
  basePath: string;
  query: string;
  joined: JoinedPreset;
  page: number;
  pageSize?: number;
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function isInJoinedPreset(dateRaw: string, preset: JoinedPreset) {
  if (preset === "all") return true;

  const now = new Date();
  const date = new Date(dateRaw);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const threeMonthsStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  if (preset === "this_month") {
    return date >= thisMonthStart;
  }

  if (preset === "last_month") {
    return date >= prevMonthStart && date < thisMonthStart;
  }

  return date >= threeMonthsStart;
}

function buildHref(basePath: string, currentQuery: string, currentJoined: JoinedPreset, nextPage: number) {
  const params = new URLSearchParams();
  if (currentQuery) params.set("q", currentQuery);
  if (currentJoined !== "all") params.set("joined", currentJoined);
  if (nextPage > 1) params.set("page", String(nextPage));

  const q = params.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export default function UserDirectoryWorkspace({
  schoolId,
  roleLabel,
  items,
  basePath,
  query,
  joined,
  page,
  pageSize = 8,
}: UserDirectoryWorkspaceProps) {
  const entitySingular = roleLabel === "Profesores" ? "Profesor" : "Administrador";
  const safeQuery = query.trim();
  const normalizedQuery = normalizeText(safeQuery);

  const filtered = items.filter((item) => {
    const fullName = normalizeText(`${item.firstName} ${item.lastName}`);
    const matchesName = normalizedQuery ? fullName.includes(normalizedQuery) : true;
    const matchesDate = isInJoinedPreset(item.createdDate, joined);
    return matchesName && matchesDate;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const current = filtered.slice(start, end);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const recentCount = filtered.filter((item) => new Date(item.createdDate) >= monthStart).length;

  const joinedOptions: Array<{ value: JoinedPreset; label: string }> = [
    { value: "all", label: "Todo" },
    { value: "this_month", label: "Este mes" },
    { value: "last_month", label: "Mes anterior" },
    { value: "last_3_months", label: "Ultimos 3 meses" },
  ];

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="grid gap-4 xl:grid-cols-[40%_60%]">
      <div className="space-y-4">
        <AccentCard
          variant="softBlue"
          eyebrow="Indicadores"
          title={`Resumen de ${roleLabel.toLowerCase()}`}
          description="Visualiza rapidamente el estado del equipo y su ritmo de incorporacion."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#c7dbf1] bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#5f82aa]">Total</p>
              <p className="mt-1 text-2xl font-semibold text-[#15365a]">{total}</p>
            </div>
            <div className="rounded-xl border border-[#c7dbf1] bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#5f82aa]">Recientes</p>
              <p className="mt-1 text-2xl font-semibold text-[#15365a]">{recentCount}</p>
              <p className="text-xs text-[#5f82aa]">unidos este mes</p>
            </div>
          </div>
        </AccentCard>

        <AccentCard
          variant="softBlue"
          eyebrow="Contexto"
          title="Gestion del equipo"
          description="Usa los filtros en la cabecera del listado para encontrar miembros de forma rapida y precisa."
        >
          <div className="rounded-xl border border-[#c7dbf1] bg-white p-4 text-sm text-[#456a92]">
            Combina busqueda por nombre y rango temporal para reducir resultados sin perder contexto.
          </div>
        </AccentCard>
      </div>

      <AccentCard
        variant="base"
        eyebrow="Listado"
        className="flex h-full flex-col p-6"
      >
        <form action={basePath} className="mb-4 rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_220px_auto] md:items-end">
            <div className="space-y-1.5">
              <label htmlFor="q" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f82aa]">
                Nombre
              </label>
              <input
                id="q"
                name="q"
                defaultValue={safeQuery}
                placeholder="Ej: Juan Perez"
                className="h-11 w-full rounded-lg border border-[#c7dbf1] bg-white px-3 text-sm text-[#15365a] placeholder:text-[#89a5c3]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="joined" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f82aa]">
                Fecha de union
              </label>
              <select
                id="joined"
                name="joined"
                defaultValue={joined}
                className="h-11 w-full rounded-lg border border-[#c7dbf1] bg-white px-3 text-sm text-[#15365a]"
              >
                {joinedOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input type="hidden" name="page" value="1" />

            <button
              type="submit"
              className="h-11 rounded-lg bg-[#1E3A5F] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#17304f]"
            >
              Aplicar
            </button>
          </div>
        </form>

        <ScrollArea className="h-[400px] pr-3">
          <div className="space-y-3 pb-1">
            {current.length ? (
              current.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 shadow-[0_16px_32px_-28px_rgba(10,31,61,0.5)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#6a8cb2]">{entitySingular}</p>
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
              ))
            ) : (
              <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                No hay resultados para los filtros seleccionados.
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {pages.map((pageNumber) => {
            const href = buildHref(basePath, safeQuery, joined, pageNumber);
            const isActive = safePage === pageNumber;

            return (
              <Link
                key={pageNumber}
                href={href}
                className={
                  isActive
                    ? "inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#1E3A5F] px-3 text-sm font-semibold text-white"
                    : "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white px-3 text-sm font-semibold text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
                }
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
      </AccentCard>
    </section>
  );
}
