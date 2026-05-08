"use server";

import { evaluationRepository } from "@/features/evaluations/data/repositories";

export async function updateEvaluation(schoolId: string, evaluationId: string, data: unknown) {
  return evaluationRepository.updateEvaluation(schoolId, evaluationId, data);
}
