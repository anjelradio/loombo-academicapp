import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import type { Level } from "../../domain/entities/level";
import type { School } from "../../domain/entities/school";
import {
  errorResult,
} from "@/features/shared/infrastructure/errors/api-error-result";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";

import {
  LevelResponseListSchema,
  SchoolCreateSchema,
  SchoolJoinByCodeSchema,
  SchoolResponseListSchema,
  SchoolResponseSchema,
} from "../schemas";
import {
  toLevelEntityList,
  toSchoolCreateRequestDto,
  toSchoolJoinByCodeRequestDto,
  toSchoolEntity,
  toSchoolEntityList,
} from "../mappers";

const baseUrl = `${env.API_URL}/schools`;

export const schoolApi = {
  async getSchoolsByUser(): Promise<ApiResult<School[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/by_user`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las escuelas.",
      responseSchema: SchoolResponseListSchema,
      mapData: toSchoolEntityList,
    });
  },

  async createSchool(data: unknown): Promise<ApiResult<School>> {
    const input = parseWithSchema(SchoolCreateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: baseUrl,
      method: "POST",
      token,
      body: toSchoolCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la escuela.",
      responseSchema: SchoolResponseSchema,
      mapData: toSchoolEntity,
    });
  },

  async getLevels(): Promise<ApiResult<Level[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/levels`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los niveles.",
      responseSchema: LevelResponseListSchema,
      mapData: toLevelEntityList,
    });
  },

  async joinSchoolByCode(data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(SchoolJoinByCodeSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/join`,
      method: "POST",
      token,
      body: toSchoolJoinByCodeRequestDto(input.data),
      fallbackMessage: "No se pudo unir a la escuela.",
    });
  },

};
