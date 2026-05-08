import type {
  EvaluationWeight,
  EvaluationWeightLevel,
} from "@/features/academic/domain/entities/evaluation-weight";

import type {
  EvaluationWeightLevelsResponseDto,
  EvaluationWeightResponseDto,
} from "../../../schemas/evaluation-weights/response/evaluation-weight-response.schema";

export function toEvaluationWeightEntity(dto: EvaluationWeightResponseDto): EvaluationWeight {
  return {
    id: dto.id,
    schoolId: dto.school_id,
    schoolLevelId: dto.school_level_id,
    ser: dto.ser,
    saber: dto.saber,
    hacer: dto.hacer,
    autoevaluacion: dto.autoevaluacion,
  };
}

export function toEvaluationWeightLevelsEntity(
  dto: EvaluationWeightLevelsResponseDto,
): EvaluationWeightLevel[] {
  return dto.map((item) => ({
    schoolLevelId: item.school_level_id,
    levelName: item.level_name,
    hasConfigured: item.has_configured,
    ser: item.ser ?? null,
    saber: item.saber ?? null,
    hacer: item.hacer ?? null,
    autoevaluacion: item.autoevaluacion ?? null,
  }));
}
