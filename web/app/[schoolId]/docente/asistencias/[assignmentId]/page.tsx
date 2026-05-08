import { redirect } from "next/navigation";

import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { attendanceSessionRepository } from "@/features/attendance/data/repositories";
import AttendanceSessionListItemCard from "@/features/attendance/presentation/components/AttendanceSessionListItemCard";
import RegisterAttendanceSessionButton from "@/features/attendance/presentation/components/RegisterAttendanceSessionButton";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import IndicatorsSummaryCard from "@/features/shared/components/cards/IndicatorsSummaryCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import AppPagination from "@/features/shared/components/navigation/AppPagination";

export default async function AssignmentAsistenciasPage({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string; assignmentId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { schoolId, assignmentId } = await params;
  const filters = await searchParams;
  const page = Number(filters.page ?? "1");
  const safePage = Number.isNaN(page) ? 1 : page;

  if (safePage < 1) {
    redirect(`/${schoolId}/docente/asistencias/${assignmentId}`);
  }

  const pageSize = 8;
  const response = await attendanceSessionRepository.getSessionsByAssignment(
    schoolId,
    assignmentId,
    safePage,
    pageSize,
  );

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "Error al obtener asistencias.");
  }

  const data = response.data;
  if (safePage > data.totalPages && data.totalPages > 0) {
    redirect(`/${schoolId}/docente/asistencias/${assignmentId}`);
  }

  return (
    <>
      <SchoolPageHeader section="Docente" page="Asistencias" />
      <ContentGridSurface variant="mist">
        <PageHeading
          title="Gestion de asistencias"
          description="Consulta sesiones previas o registra una nueva asistencia para esta materia."
          tone="light"
          returnHref={`/${schoolId}/docente/asistencias`}
          returnLabel="Volver a asistencias"
        />

        <section className="grid items-start gap-5 xl:grid-cols-[30%_70%]">
          <div className="space-y-5">
            <IndicatorsSummaryCard
              eyebrow="Indicadores"
              title="Resumen de asistencias"
              description="Panorama rapido de sesiones registradas en esta materia."
              items={[
                { label: "Sesiones totales", value: data.sessions.length },
                {
                  label: "Abiertas",
                  value: data.sessions.filter((session) => !session.isClosed).length,
                },
              ]}
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Siguiente paso"
              title="Registro por sesion"
              description="Crea una sesion para comenzar a marcar presente, licencia o falta por estudiante."
            />
          </div>

          <AccentCard variant="base" eyebrow="Listado" className="flex min-h-[460px] flex-col p-5">
            <div className="mb-4 flex justify-end">
              <RegisterAttendanceSessionButton schoolId={schoolId} assignmentId={assignmentId} />
            </div>

            <ScrollArea className="h-[380px] pr-3">
              <div className="space-y-3 pb-1">
                {data.sessions.length ? (
                  data.sessions.map((session) => (
                    <AttendanceSessionListItemCard key={session.id} schoolId={schoolId} session={session} />
                  ))
                ) : (
                  <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
                    Aun no hay sesiones de asistencia registradas para esta materia.
                  </div>
                )}
              </div>
            </ScrollArea>

            <AppPagination
              page={data.page}
              totalPages={data.totalPages}
              basePath={`/${schoolId}/docente/asistencias/${assignmentId}`}
              hasPrev={data.hasPrev}
              hasNext={data.hasNext}
            />
          </AccentCard>
        </section>
      </ContentGridSurface>
    </>
  );
}
