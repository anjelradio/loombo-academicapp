"use server";

import { evaluationRepository } from "@/features/evaluations/data/repositories";

export async function deleteEvaluation(schoolId: string, evaluationId: string) {
  return evaluationRepository.deleteEvaluation(schoolId, evaluationId);
}
