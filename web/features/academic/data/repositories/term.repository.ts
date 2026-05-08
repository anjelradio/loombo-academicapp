import { termApi } from "../api/term-api";

export const termRepository = {
  getTermsBySchool(schoolId: string) {
    return termApi.getTermsBySchool(schoolId);
  },

  createTerm(schoolId: string, data: unknown) {
    return termApi.createTerm(schoolId, data);
  },

  updateTerm(schoolId: string, termId: string, data: unknown) {
    return termApi.updateTerm(schoolId, termId, data);
  },

  deleteTerm(schoolId: string, termId: string) {
    return termApi.deleteTerm(schoolId, termId);
  },
};
