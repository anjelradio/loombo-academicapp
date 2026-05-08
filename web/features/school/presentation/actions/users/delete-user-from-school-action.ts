"use server";

import { schoolMembersRepository } from "@/features/school/data/repositories";

export async function deleteUserFromSchool(schoolId: string, targetUserId: string) {
  return schoolMembersRepository.deleteUserFromSchool(schoolId, targetUserId);
}
