"use server";

import { studentRepository } from "@/features/students/data/repositories";

export async function upsertEvaluationGrade(
  schoolId: string,
  evaluationId: string,
  studentId: string,
  data: unknown,
) {
  return studentRepository.upsertGradeByEvaluationStudent(schoolId, evaluationId, studentId, data);
}
