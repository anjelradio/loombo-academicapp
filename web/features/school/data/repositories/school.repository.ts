import { schoolApi } from "../api/school-api";

export const schoolRepository = {
  getSchoolsByUser() {
    return schoolApi.getSchoolsByUser();
  },

  getLevels() {
    return schoolApi.getLevels();
  },

  createSchool(data: unknown) {
    return schoolApi.createSchool(data);
  },

  joinSchoolByCode(data: unknown) {
    return schoolApi.joinSchoolByCode(data);
  },

  getUsersBySchool(
    schoolId: string,
    role?: "admin" | "teacher",
    page?: number,
    perPage?: number,
    name?: string,
  ) {
    return schoolApi.getUsersBySchool(schoolId, role, page, perPage, name);
  },

  deleteUserFromSchool(schoolId: string, targetUserId: string) {
    return schoolApi.deleteUserFromSchool(schoolId, targetUserId);
  },

  toggleUserRoleInSchool(schoolId: string, targetUserId: string) {
    return schoolApi.toggleUserRoleInSchool(schoolId, targetUserId);
  },
};
