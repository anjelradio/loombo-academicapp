"use server";

import { subjectRepository } from "@/features/academic/data/repositories";

export async function createSubject(schoolId: string, data: unknown) {
  return subjectRepository.createSubject(schoolId, data);
}
