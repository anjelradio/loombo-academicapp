import type { SchoolMember } from "../../../domain/entities/school-member";
import type { SchoolMemberResponseDto } from "../../schemas/school-member-response.schema";

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

export function toSchoolMemberEntityList(dtos: SchoolMemberResponseDto[]): SchoolMember[] {
  return dtos.map(toSchoolMemberEntity);
}
