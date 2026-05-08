import type { School } from "../../../../domain/entities/school";
import type {
  SchoolResponseDto,
  SchoolResponseListDto,
} from "../../../schemas/school/response";

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

export function toSchoolEntityList(dtos: SchoolResponseListDto): School[] {
  return dtos.map(toSchoolEntity);
}
