import { assignmentApi } from "../api/assignment-api";

export const assignmentRepository = {
  getTeacherAssignmentGroups(schoolId: string) {
    return assignmentApi.getTeacherAssignmentGroups(schoolId);
  },

  getAssignmentGroupsForContext(schoolId: string) {
    return assignmentApi.getAssignmentGroupsForContext(schoolId);
  },

  getAssignmentTeachers(schoolId: string, page?: number, perPage?: number, search?: string) {
    return assignmentApi.getAssignmentTeachers(schoolId, page, perPage, search);
  },

  getAssignmentCourseOptions(schoolId: string) {
    return assignmentApi.getAssignmentCourseOptions(schoolId);
  },

  getAssignmentSubjectOptions(schoolId: string, courseId: string) {
    return assignmentApi.getAssignmentSubjectOptions(schoolId, courseId);
  },

  getTeacherAssignments(schoolId: string, teacherId: string) {
    return assignmentApi.getTeacherAssignments(schoolId, teacherId);
  },

  createTeacherAssignment(schoolId: string, teacherId: string, data: unknown) {
    return assignmentApi.createTeacherAssignment(schoolId, teacherId, data);
  },

  updateTeacherAssignment(schoolId: string, teacherId: string, courseId: string, data: unknown) {
    return assignmentApi.updateTeacherAssignment(schoolId, teacherId, courseId, data);
  },

  deleteTeacherAssignment(schoolId: string, teacherId: string, courseId: string) {
    return assignmentApi.deleteTeacherAssignment(schoolId, teacherId, courseId);
  },
};
