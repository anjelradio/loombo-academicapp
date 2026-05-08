"use server";

import { studentRepository } from "@/features/students/data/repositories";

export async function createStudentInCourse(schoolId: string, courseId: string, data: unknown) {
  return studentRepository.createStudentInCourse(schoolId, courseId, data);
}
