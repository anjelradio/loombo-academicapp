"use server";

import { studentRepository } from "@/features/students/data/repositories";

export async function finalizeEvaluation(schoolId: string, evaluationId: string) {
  return studentRepository.finalizeEvaluation(schoolId, evaluationId);
}
