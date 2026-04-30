import type { School } from "../../../domain/entities/school";
import type { SchoolResponseDto } from "../../schemas/school-response.schema";

export function toSchoolEntity(dto: SchoolResponseDto): School {
  return {
    id: dto.id,
    name: dto.name,
    logoImage: dto.logo_image,
    type: dto.type,
    phone: dto.phone,
    role: dto.role,
  };
}

export function toSchoolEntityList(dtos: SchoolResponseDto[]): School[] {
  return dtos.map(toSchoolEntity);
}
