import { subjectApi } from "../api/subject-api";

export const subjectRepository = {
  getSubjectsBySchool(schoolId: string, page?: number, perPage?: number, search?: string) {
    return subjectApi.getSubjectsBySchool(schoolId, page, perPage, search);
  },

  createSubject(schoolId: string, data: unknown) {
    return subjectApi.createSubject(schoolId, data);
  },

  updateSubject(schoolId: string, subjectId: string, data: unknown) {
    return subjectApi.updateSubject(schoolId, subjectId, data);
  },

  deleteSubject(schoolId: string, subjectId: string) {
    return subjectApi.deleteSubject(schoolId, subjectId);
  },
};
