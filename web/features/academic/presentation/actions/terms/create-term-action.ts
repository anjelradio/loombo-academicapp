"use server";

import { termRepository } from "@/features/academic/data/repositories";

export async function createTerm(schoolId: string, data: unknown) {
  return termRepository.createTerm(schoolId, data);
}
