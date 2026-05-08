"use server";

import { assignmentRepository } from "@/features/academic/data/repositories";

export async function createTeacherAssignment(schoolId: string, teacherId: string, data: unknown) {
  return assignmentRepository.createTeacherAssignment(schoolId, teacherId, data);
}
