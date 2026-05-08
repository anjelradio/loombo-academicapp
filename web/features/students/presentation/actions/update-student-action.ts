"use server";

import { studentRepository } from "@/features/students/data/repositories";

export async function updateStudent(schoolId: string, studentId: string, data: unknown) {
  return studentRepository.updateStudent(schoolId, studentId, data);
}
