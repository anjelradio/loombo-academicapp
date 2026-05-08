"use server";

import { studentRepository } from "@/features/students/data/repositories";

export async function unlinkStudentFromCourse(
  schoolId: string,
  courseId: string,
  studentId: string,
) {
  return studentRepository.unlinkStudentFromCourse(schoolId, courseId, studentId);
}
