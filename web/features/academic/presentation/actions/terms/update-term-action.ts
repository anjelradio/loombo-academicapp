"use server";

import { termRepository } from "@/features/academic/data/repositories";

export async function updateTerm(schoolId: string, termId: string, data: unknown) {
  return termRepository.updateTerm(schoolId, termId, data);
}
