"use server";

import { evaluationRepository } from "@/features/evaluations/data/repositories";

export async function createEvaluation(schoolId: string, data: unknown) {
  return evaluationRepository.createEvaluation(schoolId, data);
}
