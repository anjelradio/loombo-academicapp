"use server";

import { evaluationRepository } from "@/features/evaluations/data/repositories";

export async function calculateTermAverages(schoolId: string, assignmentId: string, termId: string) {
  return evaluationRepository.calculateTermAveragesByAssignment(schoolId, assignmentId, termId);
}
