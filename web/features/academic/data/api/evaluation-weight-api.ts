import { apiRequestJson, apiRequestStatus } from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import type { EvaluationWeightLevel } from "../../domain/entities/evaluation-weight";

import {
  toEvaluationWeightLevelsEntity,
  toEvaluationWeightUpsertRequestDto,
} from "../mappers/evaluation-weights";
import {
  EvaluationWeightLevelsResponseSchema,
} from "../schemas/evaluation-weights";
import { EvaluationWeightUpsertSchema } from "../schemas/evaluation-weights";

const baseUrl = `${env.API_URL}/academic`;

export const evaluationWeightApi = {
  async getEvaluationWeightsBySchool(schoolId: string): Promise<ApiResult<EvaluationWeightLevel[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluation-weights`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las ponderaciones.",
      responseSchema: EvaluationWeightLevelsResponseSchema,
      mapData: toEvaluationWeightLevelsEntity,
    });
  },

  async upsertEvaluationWeight(
    schoolId: string,
    schoolLevelId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(EvaluationWeightUpsertSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/evaluation-weights/${schoolLevelId}`,
      method: "PUT",
      token,
      body: toEvaluationWeightUpsertRequestDto(input.data),
      fallbackMessage: "No se pudo guardar la ponderacion.",
    });
  },
};
