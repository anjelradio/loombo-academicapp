import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { attendanceSessionRepository } from "@/features/attendance/data/repositories";
import AttendanceSessionInfoCard from "@/features/attendance/presentation/components/AttendanceSessionInfoCard";
import AttendanceStudentsTable from "@/features/attendance/presentation/components/AttendanceStudentsTable";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default async function AsistirSessionPage({
  params,
}: {
  params: Promise<{ schoolId: string; sessionId: string }>;
}) {
  const { schoolId, sessionId } = await params;

  const [sessionResponse, statusOptionsResponse, gradebookResponse] = await Promise.all([
    attendanceSessionRepository.getSessionById(schoolId, sessionId),
    attendanceSessionRepository.getStatusOptions(schoolId),
    attendanceSessionRepository.getGradebookBySession(schoolId, sessionId),
  ]);

  if (!sessionResponse.ok) {
    throw new Error(sessionResponse.errors[0] ?? "No se pudo obtener la sesion de asistencia.");
  }
  if (!statusOptionsResponse.ok) {
    throw new Error(statusOptionsResponse.errors[0] ?? "No se pudieron obtener los estados de asistencia.");
  }
  if (!gradebookResponse.ok) {
    throw new Error(gradebookResponse.errors[0] ?? "No se pudo obtener el listado de estudiantes.");
  }

  const session = sessionResponse.data;

  return (
    <>
      <SchoolPageHeader section="Docente" page="Asistir" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title={session.name}
          description="Marca presente, licencia o falta por estudiante. El guardado se realiza al instante con cada seleccion."
          tone="light"
          returnHref={`/${schoolId}/docente/asistencias/${session.assignmentId}`}
          returnLabel="Volver al listado"
        />

        <section className="grid items-start gap-5 xl:grid-cols-[60%_40%]">
          <AccentCard variant="base" eyebrow="Estudiantes" className="min-h-[580px] p-5">
            <AttendanceStudentsTable
              schoolId={schoolId}
              sessionId={sessionId}
              rows={gradebookResponse.data}
              statusOptions={statusOptionsResponse.data}
              disabled={session.isClosed}
            />
          </AccentCard>

          <AttendanceSessionInfoCard
            schoolId={schoolId}
            session={session}
            statusOptions={statusOptionsResponse.data}
          />
        </section>
      </ContentGridSurface>
    </>
  );
}
