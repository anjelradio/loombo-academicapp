"use server";

import { schoolMembersRepository } from "@/features/school/data/repositories";

export async function toggleUserRoleInSchool(schoolId: string, targetUserId: string) {
  return schoolMembersRepository.toggleUserRoleInSchool(schoolId, targetUserId);
}
