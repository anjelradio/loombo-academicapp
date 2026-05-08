import type {
  AssignmentCourseOption,
  AssignmentSubjectOption,
  AssignmentTeacher,
  AssignmentTeacherList,
  TeacherAssignments,
} from "@/features/academic/domain/entities/assignment";
import type { TeacherAssignmentContextCourseGroup } from "@/features/academic/domain/entities/teacher-assignment-context";

import type {
  AssignmentCourseOptionResponseDto,
  AssignmentSubjectOptionResponseDto,
  AssignmentTeacherListResponseDto,
  AssignmentTeacherResponseDto,
  TeacherAssignmentContextCourseGroupResponseDto,
  TeacherAssignmentsResponseDto,
} from "../../../schemas/assignments/response/assignment-response.schema";

export function toAssignmentTeacherEntity(dto: AssignmentTeacherResponseDto): AssignmentTeacher {
  return {
    teacherId: dto.teacher_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    courseNames: dto.course_names,
  };
}

export function toAssignmentTeacherListEntity(
  dto: AssignmentTeacherListResponseDto,
): AssignmentTeacherList {
  return {
    teachers: dto.teachers.map(toAssignmentTeacherEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}

export function toAssignmentCourseOptionEntity(
  dto: AssignmentCourseOptionResponseDto,
): AssignmentCourseOption {
  return {
    courseId: dto.course_id,
    courseName: dto.course_name,
  };
}

export function toAssignmentSubjectOptionEntity(
  dto: AssignmentSubjectOptionResponseDto,
): AssignmentSubjectOption {
  return {
    subjectId: dto.subject_id,
    subjectName: dto.subject_name,
  };
}

export function toTeacherAssignmentsEntity(dto: TeacherAssignmentsResponseDto): TeacherAssignments {
  return {
    teacherId: dto.teacher_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    assignments: dto.assignments.map((assignment) => ({
      courseId: assignment.course_id,
      courseName: assignment.course_name,
      subjects: assignment.subjects.map((subject) => ({
        subjectId: subject.subject_id,
        subjectName: subject.subject_name,
      })),
    })),
  };
}

export function toTeacherAssignmentContextCourseGroupEntity(
  dto: TeacherAssignmentContextCourseGroupResponseDto,
): TeacherAssignmentContextCourseGroup {
  return {
    courseId: dto.course_id,
    courseName: dto.course_name,
    subjects: dto.subjects.map((subject) => ({
      assignmentId: subject.assignment_id,
      subjectId: subject.subject_id,
      subjectName: subject.subject_name,
    })),
  };
}
