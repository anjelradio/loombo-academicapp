import type {
  AssignmentCreateData,
  AssignmentUpdateData,
} from "../../../schemas/assignments/request/assignment.schema";

export function toAssignmentCreateRequestDto(data: AssignmentCreateData) {
  return {
    course_id: data.courseId,
    subject_ids: data.subjectIds,
  };
}

export function toAssignmentUpdateRequestDto(data: AssignmentUpdateData) {
  return {
    subject_ids: data.subjectIds,
  };
}
