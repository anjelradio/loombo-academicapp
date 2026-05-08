import type { Student, StudentList } from "@/features/students/domain/entities/student";
import type {
  StudentListResponseDto,
  StudentResponseDto,
} from "../../../schemas/students/response";

export function toStudentEntity(dto: StudentResponseDto): Student {
  return {
    id: dto.id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    birthDate: dto.birth_date,
    schoolId: dto.school_id,
  };
}

export function toStudentListEntity(dto: StudentListResponseDto): StudentList {
  return {
    students: dto.students.map(toStudentEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}
