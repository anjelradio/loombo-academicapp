import type {
  SubjectCreateData,
  SubjectUpdateData,
} from "../../../schemas/subjects/request/subject.schema";

export function toSubjectCreateRequestDto(data: SubjectCreateData) {
  return {
    name: data.name,
  };
}

export function toSubjectUpdateRequestDto(data: SubjectUpdateData) {
  return {
    name: data.name,
  };
}
