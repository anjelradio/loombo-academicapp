import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import type { Term } from "../../domain/entities/term";

import {
  toTermCreateRequestDto,
  toTermListEntity,
  toTermUpdateRequestDto,
} from "../mappers/terms";
import { TermListResponseSchema, TermCreateSchema, TermUpdateSchema } from "../schemas/terms";

const baseUrl = `${env.API_URL}/academic`;

export const termApi = {
  async getTermsBySchool(schoolId: string): Promise<ApiResult<Term[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/terms`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los trimestres.",
      responseSchema: TermListResponseSchema,
      mapData: toTermListEntity,
    });
  },

  async createTerm(schoolId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(TermCreateSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/terms`,
      method: "POST",
      token,
      body: toTermCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear el trimestre.",
    });
  },

  async updateTerm(schoolId: string, termId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(TermUpdateSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/terms/${termId}`,
      method: "PUT",
      token,
      body: toTermUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar el trimestre.",
    });
  },

  async deleteTerm(schoolId: string, termId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/terms/${termId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar el trimestre.",
    });
  },
};
