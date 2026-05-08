import type { Term } from "@/features/academic/domain/entities/term";
import type {
  TermListResponseDto,
  TermResponseDto,
} from "../../../schemas/terms/response/term-response.schema";

export function toTermEntity(dto: TermResponseDto): Term {
  return {
    id: dto.id,
    name: dto.name,
    startDate: dto.start_date,
    endDate: dto.end_date,
    schoolId: dto.school_id,
  };
}

export function toTermListEntity(dto: TermListResponseDto): Term[] {
  return dto.map(toTermEntity);
}
