import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import { evaluationRepository } from "@/features/evaluations/data/repositories";
import EvaluationInfoCard from "@/features/evaluations/presentation/components/EvaluationInfoCard";
import EvaluationStudentsTable from "@/features/evaluations/presentation/components/EvaluationStudentsTable";
import { studentRepository } from "@/features/students/data/repositories";

export default async function EvaluarEvaluationPage({
  params,
}: {
  params: Promise<{ schoolId: string; evaluationId: string }>;
}) {
  const { schoolId, evaluationId } = await params;

  const [evaluationResponse, typeOptionsResponse, termOptionsResponse, studentsResponse] = await Promise.all([
    evaluationRepository.getEvaluationById(schoolId, evaluationId),
    evaluationRepository.getEvaluationTypeOptions(schoolId),
    evaluationRepository.getEvaluationTermOptions(schoolId),
    studentRepository.getGradebookByEvaluation(schoolId, evaluationId),
  ]);

  if (!evaluationResponse.ok) {
    throw new Error(evaluationResponse.errors[0] ?? "No se pudo obtener la evaluacion.");
  }
  if (!typeOptionsResponse.ok) {
    throw new Error(typeOptionsResponse.errors[0] ?? "No se pudieron obtener los tipos de evaluacion.");
  }
  if (!termOptionsResponse.ok) {
    throw new Error(termOptionsResponse.errors[0] ?? "No se pudieron obtener los trimestres.");
  }
  if (!studentsResponse.ok) {
    throw new Error(studentsResponse.errors[0] ?? "No se pudieron obtener los estudiantes.");
  }

  const evaluation = evaluationResponse.data;

  return (
    <>
      <SchoolPageHeader section="Docente" page="Evaluar" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title={evaluation.name}
          description="Gestiona la evaluacion y prepara el registro de calificaciones por estudiante."
          tone="light"
          returnHref={`/${schoolId}/docente/evaluaciones/${evaluation.assignmentId}`}
          returnLabel="Volver al listado"
        />

        <section className="grid items-start gap-5 xl:grid-cols-[60%_40%]">
          <AccentCard variant="base" eyebrow="Estudiantes" className="min-h-[580px] p-5">
            <EvaluationStudentsTable
              schoolId={schoolId}
              evaluationId={evaluationId}
              rows={studentsResponse.data}
            />
          </AccentCard>

          <EvaluationInfoCard
            schoolId={schoolId}
            evaluation={evaluation}
            typeOptions={typeOptionsResponse.data}
            termOptions={termOptionsResponse.data}
          />
        </section>
      </ContentGridSurface>
    </>
  );
}
