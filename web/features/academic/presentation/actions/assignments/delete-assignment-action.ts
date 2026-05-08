"use server";

import { assignmentRepository } from "@/features/academic/data/repositories";

export async function deleteTeacherAssignment(
  schoolId: string,
  teacherId: string,
  courseId: string,
) {
  return assignmentRepository.deleteTeacherAssignment(schoolId, teacherId, courseId);
}
