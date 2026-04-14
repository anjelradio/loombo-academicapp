"use server";

import { schoolRepository } from "@/features/school/data/repositories/school.repository";

export async function deleteUserFromSchool(schoolId: string, targetUserId: string) {
  return schoolRepository.deleteUserFromSchool(schoolId, targetUserId);
}
