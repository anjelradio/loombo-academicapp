"use server";

import { schoolRepository } from "@/features/school/data/repositories/school.repository";

export async function toggleUserRoleInSchool(schoolId: string, targetUserId: string) {
  return schoolRepository.toggleUserRoleInSchool(schoolId, targetUserId);
}
