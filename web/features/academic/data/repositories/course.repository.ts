import { courseApi } from "../api/course-api";

export const courseRepository = {
  getCoursesBySchool(schoolId: string, page?: number, perPage?: number, search?: string) {
    return courseApi.getCoursesBySchool(schoolId, page, perPage, search);
  },

  getCourseFormOptions(schoolId: string) {
    return courseApi.getCourseFormOptions(schoolId);
  },

  getCourseById(schoolId: string, courseId: string) {
    return courseApi.getCourseById(schoolId, courseId);
  },

  createCourse(schoolId: string, data: unknown) {
    return courseApi.createCourse(schoolId, data);
  },

  updateCourse(schoolId: string, courseId: string, data: unknown) {
    return courseApi.updateCourse(schoolId, courseId, data);
  },

  deleteCourse(schoolId: string, courseId: string) {
    return courseApi.deleteCourse(schoolId, courseId);
  },
};
