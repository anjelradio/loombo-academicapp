import type {
  EvaluationCreateData,
  EvaluationUpdateData,
} from "../../../schemas/evaluations/request";

export function toEvaluationCreateRequestDto(data: EvaluationCreateData) {
  return {
    name: data.name,
    description: data.description || null,
    presentation_date: data.presentationDate,
    term_id: data.termId,
    evaluation_type_id: data.evaluationTypeId,
    assignment_id: data.assignmentId,
  };
}

export function toEvaluationUpdateRequestDto(data: EvaluationUpdateData) {
  return {
    name: data.name,
    description: data.description || null,
    presentation_date: data.presentationDate,
    term_id: data.termId,
    evaluation_type_id: data.evaluationTypeId,
  };
}
