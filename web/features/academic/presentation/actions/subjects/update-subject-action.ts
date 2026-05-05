"use server";

import { subjectRepository } from "@/features/academic/data/repositories/subject.repository";

export async function updateSubject(schoolId: string, subjectId: string, data: unknown) {
  return subjectRepository.updateSubject(schoolId, subjectId, data);
}
