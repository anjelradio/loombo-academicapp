"use server";

import { evaluationWeightRepository } from "@/features/academic/data/repositories";

export async function updateEvaluationWeight(
  schoolId: string,
  schoolLevelId: string,
  data: unknown,
) {
  return evaluationWeightRepository.upsertEvaluationWeight(schoolId, schoolLevelId, data);
}
