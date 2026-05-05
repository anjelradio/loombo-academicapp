"use server";

import { subjectRepository } from "@/features/academic/data/repositories/subject.repository";

export async function deleteSubject(schoolId: string, subjectId: string) {
  return subjectRepository.deleteSubject(schoolId, subjectId);
}
