"use server";

import { courseRepository } from "@/features/academic/data/repositories/course.repository";

export async function updateCourse(schoolId: string, courseId: string, data: unknown) {
  return courseRepository.updateCourse(schoolId, courseId, data);
}
