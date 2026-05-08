import { evaluationApi } from "../api/evaluation-api";

export const evaluationRepository = {
  getEvaluationTypeOptions(schoolId: string) {
    return evaluationApi.getEvaluationTypeOptions(schoolId);
  },

  getEvaluationTermOptions(schoolId: string) {
    return evaluationApi.getEvaluationTermOptions(schoolId);
  },

  getTermAverageOptions(schoolId: string) {
    return evaluationApi.getTermAverageOptions(schoolId);
  },

  getTermAveragesByAssignment(schoolId: string, assignmentId: string, termId: string) {
    return evaluationApi.getTermAveragesByAssignment(schoolId, assignmentId, termId);
  },

  calculateTermAveragesByAssignment(schoolId: string, assignmentId: string, termId: string) {
    return evaluationApi.calculateTermAveragesByAssignment(schoolId, assignmentId, termId);
  },

  getEvaluationsByAssignment(schoolId: string, assignmentId: string, page?: number, perPage?: number) {
    return evaluationApi.getEvaluationsByAssignment(schoolId, assignmentId, page, perPage);
  },

  getEvaluationById(schoolId: string, evaluationId: string) {
    return evaluationApi.getEvaluationById(schoolId, evaluationId);
  },

  createEvaluation(schoolId: string, data: unknown) {
    return evaluationApi.createEvaluation(schoolId, data);
  },

  updateEvaluation(schoolId: string, evaluationId: string, data: unknown) {
    return evaluationApi.updateEvaluation(schoolId, evaluationId, data);
  },

  deleteEvaluation(schoolId: string, evaluationId: string) {
    return evaluationApi.deleteEvaluation(schoolId, evaluationId);
  },
};
