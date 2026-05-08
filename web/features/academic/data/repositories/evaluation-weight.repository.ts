import { evaluationWeightApi } from "../api/evaluation-weight-api";

export const evaluationWeightRepository = {
  getEvaluationWeightsBySchool(schoolId: string) {
    return evaluationWeightApi.getEvaluationWeightsBySchool(schoolId);
  },

  upsertEvaluationWeight(schoolId: string, schoolLevelId: string, data: unknown) {
    return evaluationWeightApi.upsertEvaluationWeight(schoolId, schoolLevelId, data);
  },
};
