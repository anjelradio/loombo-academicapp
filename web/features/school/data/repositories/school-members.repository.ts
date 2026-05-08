import { schoolMembersApi } from "../api/school-members-api";

export const schoolMembersRepository = {
  getUsersBySchool(
    schoolId: string,
    role?: "admin" | "teacher",
    page?: number,
    perPage?: number,
    name?: string,
  ) {
    return schoolMembersApi.getUsersBySchool(schoolId, role, page, perPage, name);
  },

  deleteUserFromSchool(schoolId: string, targetUserId: string) {
    return schoolMembersApi.deleteUserFromSchool(schoolId, targetUserId);
  },

  toggleUserRoleInSchool(schoolId: string, targetUserId: string) {
    return schoolMembersApi.toggleUserRoleInSchool(schoolId, targetUserId);
  },
};
