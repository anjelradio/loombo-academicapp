"use server";

import { assignmentRepository } from "@/features/academic/data/repositories";

export async function updateTeacherAssignment(
  schoolId: string,
  teacherId: string,
  courseId: string,
  data: unknown,
) {
  return assignmentRepository.updateTeacherAssignment(schoolId, teacherId, courseId, data);
}
