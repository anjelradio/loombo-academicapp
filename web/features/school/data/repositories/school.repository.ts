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
};
