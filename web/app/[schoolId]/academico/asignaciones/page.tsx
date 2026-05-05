import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

export default function AsignacionesPage() {
  return (
    <>
      <SchoolPageHeader section="Academico" page="Asignaciones" />
      <ContentGridSurface variant="diagonal">
        <PageHeading
          title="Asignaciones"
          description="Aqui podras asignar materias y cursos a cada docente de la escuela."
          tone="light"
        />
        <AccentCard
          variant="softBlue"
          eyebrow="Proximo paso"
          title="Asignar docentes"
          description="Pendiente de implementacion."
        />
      </ContentGridSurface>
    </>
  );
}
