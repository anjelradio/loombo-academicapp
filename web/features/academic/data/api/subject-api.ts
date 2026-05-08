import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import {
  errorResult,
} from "@/features/shared/infrastructure/errors/api-error-result";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import type { SubjectList } from "../../domain/entities/subject";

import {
  toSubjectCreateRequestDto,
  toSubjectListEntity,
  toSubjectUpdateRequestDto,
} from "../mappers/subjects";
import {
  SubjectListResponseSchema,
  SubjectCreateSchema,
  SubjectUpdateSchema,
} from "../schemas/subjects";

const baseUrl = `${env.API_URL}/academic`;

export const subjectApi = {
  async getSubjectsBySchool(
    schoolId: string,
    page = 1,
    perPage = 8,
    search?: string,
  ): Promise<ApiResult<SubjectList>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (search && search.trim()) {
      params.set("search", search.trim());
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/subjects?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las materias.",
      responseSchema: SubjectListResponseSchema,
      mapData: toSubjectListEntity,
    });
  },

  async createSubject(schoolId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(SubjectCreateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/subjects`,
      method: "POST",
      token,
      body: toSubjectCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la materia.",
    });
  },

  async updateSubject(
    schoolId: string,
    subjectId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(SubjectUpdateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/subjects/${subjectId}`,
      method: "PATCH",
      token,
      body: toSubjectUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar la materia.",
    });
  },

  async deleteSubject(schoolId: string, subjectId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/subjects/${subjectId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar la materia.",
    });
  },
};
