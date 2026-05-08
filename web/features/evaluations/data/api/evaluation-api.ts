import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import { apiRequestJson, apiRequestStatus } from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import type {
  Evaluation,
  EvaluationList,
  EvaluationTermOption,
  EvaluationTypeOption,
  StudentTermAverageRow,
} from "../../domain/entities/evaluation";

import {
  toEvaluationCreateRequestDto,
  toEvaluationListEntity,
  toEvaluationTermOptionEntity,
  toEvaluationTypeOptionEntity,
  toEvaluationEntity,
  toStudentTermAverageRowEntity,
  toEvaluationUpdateRequestDto,
} from "../mappers";
import {
  EvaluationResponseSchema,
  EvaluationListResponseSchema,
  EvaluationTermOptionResponseSchema,
  EvaluationTypeOptionResponseSchema,
  StudentTermAverageRowResponseSchema,
  EvaluationCreateSchema,
  EvaluationUpdateSchema,
} from "../schemas";

const baseUrl = `${env.API_URL}/evaluations`;

export const evaluationApi = {
  async getEvaluationTypeOptions(schoolId: string): Promise<ApiResult<EvaluationTypeOption[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluation-types`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los tipos de evaluacion.",
      responseSchema: EvaluationTypeOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toEvaluationTypeOptionEntity),
    });
  },

  async getEvaluationTermOptions(schoolId: string): Promise<ApiResult<EvaluationTermOption[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/term-options`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los trimestres.",
      responseSchema: EvaluationTermOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toEvaluationTermOptionEntity),
    });
  },

  async getTermAverageOptions(schoolId: string): Promise<ApiResult<EvaluationTermOption[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/term-average-options`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los trimestres.",
      responseSchema: EvaluationTermOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toEvaluationTermOptionEntity),
    });
  },

  async getTermAveragesByAssignment(
    schoolId: string,
    assignmentId: string,
    termId: string,
  ): Promise<ApiResult<StudentTermAverageRow[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignments/${assignmentId}/terms/${termId}/averages`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los promedios del trimestre.",
      responseSchema: StudentTermAverageRowResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toStudentTermAverageRowEntity),
    });
  },

  async calculateTermAveragesByAssignment(
    schoolId: string,
    assignmentId: string,
    termId: string,
  ): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/assignments/${assignmentId}/terms/${termId}/averages/calculate`,
      method: "POST",
      token,
      fallbackMessage: "No se pudieron calcular los promedios del trimestre.",
    });
  },

  async getEvaluationsByAssignment(
    schoolId: string,
    assignmentId: string,
    page = 1,
    perPage = 8,
  ): Promise<ApiResult<EvaluationList>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignments/${assignmentId}/evaluations?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las evaluaciones.",
      responseSchema: EvaluationListResponseSchema,
      mapData: toEvaluationListEntity,
    });
  },

  async getEvaluationById(schoolId: string, evaluationId: string): Promise<ApiResult<Evaluation>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener la evaluacion.",
      responseSchema: EvaluationResponseSchema,
      mapData: toEvaluationEntity,
    });
  },

  async createEvaluation(schoolId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(EvaluationCreateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/evaluations`,
      method: "POST",
      token,
      body: toEvaluationCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la evaluacion.",
    });
  },

  async updateEvaluation(
    schoolId: string,
    evaluationId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(EvaluationUpdateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}`,
      method: "PUT",
      token,
      body: toEvaluationUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar la evaluacion.",
    });
  },

  async deleteEvaluation(schoolId: string, evaluationId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar la evaluacion.",
    });
  },
};
