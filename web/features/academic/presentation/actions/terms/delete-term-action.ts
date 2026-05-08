"use server";

import { termRepository } from "@/features/academic/data/repositories";

export async function deleteTerm(schoolId: string, termId: string) {
  return termRepository.deleteTerm(schoolId, termId);
}
