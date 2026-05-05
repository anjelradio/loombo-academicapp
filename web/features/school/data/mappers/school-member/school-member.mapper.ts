import type { SchoolMember } from "../../../domain/entities/school-member";
import type {
  SchoolMemberResponseDto,
  SchoolMemberResponseListDto,
} from "../../schemas/school-member-response.schema";
import type { SchoolMemberList } from "../../../domain/entities/school-member";

export function toSchoolMemberEntity(dto: SchoolMemberResponseDto): SchoolMember {
  return {
    id: dto.id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    email: dto.email,
    role: dto.role,
    createdDate: dto.created_date,
  };
}

export function toSchoolMemberListEntity(
  dto: SchoolMemberResponseListDto,
): SchoolMemberList {
  return {
    users: dto.users.map(toSchoolMemberEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}
