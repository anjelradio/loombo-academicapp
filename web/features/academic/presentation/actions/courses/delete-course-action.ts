"use server";

import { courseRepository } from "@/features/academic/data/repositories";

export async function deleteCourse(schoolId: string, courseId: string) {
  return courseRepository.deleteCourse(schoolId, courseId);
}
