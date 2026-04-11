import { schoolApi } from "../api/school-api";

export const schoolRepository = {
  getSchoolsByUser() {
    return schoolApi.getSchoolsByUser();
  },

  createSchool(data: unknown) {
    return schoolApi.createSchool(data);
  },

  joinSchoolByCode(data: unknown) {
    return schoolApi.joinSchoolByCode(data);
  },
};
