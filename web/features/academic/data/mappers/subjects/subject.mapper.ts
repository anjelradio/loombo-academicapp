import type { Subject, SubjectList } from "@/features/academic/domain/entities/subject";

import type {
  SubjectListResponseDto,
  SubjectResponseDto,
} from "../../schemas/subjects/subject-response.schema";

export function toSubjectEntity(dto: SubjectResponseDto): Subject {
  return {
    id: dto.id,
    name: dto.name,
    schoolId: dto.school_id,
  };
}

export function toSubjectListEntity(dto: SubjectListResponseDto): SubjectList {
  return {
    subjects: dto.subjects.map(toSubjectEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}
