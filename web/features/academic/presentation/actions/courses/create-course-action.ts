"use server";

import { courseRepository } from "@/features/academic/data/repositories";

export async function createCourse(schoolId: string, data: unknown) {
  return courseRepository.createCourse(schoolId, data);
}
