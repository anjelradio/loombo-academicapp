import type {
  CourseCreateData,
  CourseUpdateData,
} from "../../../schemas/courses/request/course.schema";

export function toCourseCreateRequestDto(data: CourseCreateData) {
  return {
    name: data.name,
    school_level_id: data.schoolLevelId,
    subject_ids: data.subjectIds,
  };
}

export function toCourseUpdateRequestDto(data: CourseUpdateData) {
  return {
    name: data.name,
    school_level_id: data.schoolLevelId,
    subject_ids: data.subjectIds,
  };
}
