import type {
  Evaluation,
  EvaluationList,
  EvaluationTermOption,
  EvaluationTypeOption,
  StudentTermAverageRow,
} from "@/features/evaluations/domain/entities/evaluation";

import type {
  EvaluationListResponseDto,
  EvaluationResponseDto,
  EvaluationTermOptionResponseDto,
  EvaluationTypeOptionResponseDto,
  StudentTermAverageRowResponseDto,
} from "../../../schemas/evaluations/response";

export function toEvaluationEntity(dto: EvaluationResponseDto): Evaluation {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    presentationDate: dto.presentation_date,
    termId: dto.term_id,
    termName: dto.term_name,
    assignmentId: dto.assignment_id,
    evaluationTypeId: dto.evaluation_type_id,
    evaluationTypeName: dto.evaluation_type_name,
    schoolId: dto.school_id,
    isClosed: dto.is_closed,
  };
}

export function toEvaluationListEntity(dto: EvaluationListResponseDto): EvaluationList {
  return {
    evaluations: dto.evaluations.map(toEvaluationEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}

export function toEvaluationTypeOptionEntity(
  dto: EvaluationTypeOptionResponseDto,
): EvaluationTypeOption {
  return {
    id: dto.id,
    name: dto.name,
  };
}

export function toEvaluationTermOptionEntity(
  dto: EvaluationTermOptionResponseDto,
): EvaluationTermOption {
  return {
    id: dto.id,
    name: dto.name,
    startDate: dto.start_date,
    endDate: dto.end_date,
    isActive: dto.is_active,
  };
}

export function toStudentTermAverageRowEntity(
  dto: StudentTermAverageRowResponseDto,
): StudentTermAverageRow {
  return {
    studentId: dto.student_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    saberScore: dto.saber_score,
    hacerScore: dto.hacer_score,
    serScore: dto.ser_score,
    autoevaluacionScore: dto.autoevaluacion_score,
    finalScore: dto.final_score,
    status: dto.status,
  };
}
