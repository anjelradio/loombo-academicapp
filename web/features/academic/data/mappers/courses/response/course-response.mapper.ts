import type {
  Course,
  CourseFormOptions,
  CourseList,
} from "@/features/academic/domain/entities/course";

import type {
  CourseFormOptionsResponseDto,
  CourseListResponseDto,
  CourseResponseDto,
} from "../../../schemas/courses/response/course-response.schema";

export function toCourseEntity(dto: CourseResponseDto): Course {
  return {
    id: dto.id,
    name: dto.name,
    schoolId: dto.school_id,
    schoolLevelId: dto.school_level_id,
    levelName: dto.level_name,
    subjectIds: dto.subject_ids,
    subjectNames: dto.subject_names,
  };
}

export function toCourseListEntity(dto: CourseListResponseDto): CourseList {
  return {
    courses: dto.courses.map(toCourseEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}

export function toCourseFormOptionsEntity(
  dto: CourseFormOptionsResponseDto,
): CourseFormOptions {
  return {
    schoolLevels: dto.school_levels.map((level) => ({
      id: level.id,
      name: level.name,
    })),
    subjects: dto.subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
    })),
  };
}
