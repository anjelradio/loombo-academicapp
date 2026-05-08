import type {
  EvaluationFinalizeSummary,
  StudentGradebookRow,
} from "@/features/students/domain/entities/student-gradebook";
import type {
  EvaluationFinalizeSummaryResponseDto,
  StudentGradebookRowResponseDto,
} from "../../../schemas/gradebook/response";

export function toStudentGradebookRowEntity(dto: StudentGradebookRowResponseDto): StudentGradebookRow {
  return {
    studentId: dto.student_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    score: dto.score,
    observation: dto.observation,
    evaluationGradeId: dto.evaluation_grade_id,
    status: dto.status,
  };
}

export function toEvaluationFinalizeSummaryEntity(
  dto: EvaluationFinalizeSummaryResponseDto,
): EvaluationFinalizeSummary {
  return {
    createdMissing: dto.created_missing,
    totalStudents: dto.total_students,
  };
}
