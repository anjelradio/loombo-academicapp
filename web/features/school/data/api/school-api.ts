import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
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
} from "../schemas/level-response.schema";
import {
  SchoolCreateSchema,
  SchoolJoinByCodeSchema,
  SchoolResponseListSchema,
  SchoolResponseSchema,
} from "../schemas/school.schema";
import {
  SchoolMemberFilterRoleEnum,
  SchoolMemberResponseListSchema,
  SchoolMemberResponseSchema,
} from "../schemas/school-member.schema";
import {
  toLevelEntityList,
} from "../mappers/level/level.mapper";
import {
  toSchoolEntity,
  toSchoolEntityList,
} from "../mappers/school/school.mapper";
import {
  toSchoolMemberEntity,
  toSchoolMemberListEntity,
} from "../mappers/school-member/school-member.mapper";
import type {
  SchoolActionResult,
  LevelListResult,
  SchoolListResult,
  SchoolMemberListResult,
  SchoolMemberResult,
  SchoolResult,
} from "../types/school.types";

const baseUrl = `${env.API_URL}/schools`;

export const schoolApi = {
  async getSchoolsByUser(): Promise<SchoolListResult> {
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

  async createSchool(data: unknown): Promise<SchoolResult> {
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
      body: {
        name: input.data.name,
        type: input.data.type,
        phone: input.data.phone,
        level_ids: input.data.levelIds,
      },
      fallbackMessage: "No se pudo crear la escuela.",
      responseSchema: SchoolResponseSchema,
      mapData: toSchoolEntity,
    });
  },

  async getLevels(): Promise<LevelListResult> {
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

  async joinSchoolByCode(data: unknown): Promise<SchoolResult> {
    const input = parseWithSchema(SchoolJoinByCodeSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/join`,
      method: "POST",
      token,
      body: input.data,
      fallbackMessage: "No se pudo unir a la escuela.",
      responseSchema: SchoolResponseSchema,
      mapData: toSchoolEntity,
    });
  },

  async getUsersBySchool(
    schoolId: string,
    role?: "admin" | "teacher",
    page = 1,
    perPage = 8,
    name?: string,
  ): Promise<SchoolMemberListResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    if (role) {
      const roleResult = SchoolMemberFilterRoleEnum.safeParse(role);
      if (!roleResult.success) {
        return errorResult("Rol de filtro invalido");
      }
    }

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (role) {
      params.set("role", role);
    }
    if (name && name.trim()) {
      params.set("name", name.trim());
    }

    return apiRequestJson({
      url: `${baseUrl}/${schoolId}/users?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los usuarios de la escuela.",
      responseSchema: SchoolMemberResponseListSchema,
      mapData: toSchoolMemberListEntity,
    });
  },

  async deleteUserFromSchool(
    schoolId: string,
    targetUserId: string,
  ): Promise<SchoolActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/${schoolId}/users/${targetUserId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar el usuario de la escuela.",
    });
  },

  async toggleUserRoleInSchool(
    schoolId: string,
    targetUserId: string,
  ): Promise<SchoolMemberResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/${schoolId}/users/${targetUserId}/role`,
      method: "PATCH",
      token,
      fallbackMessage: "No se pudo actualizar el rol del usuario.",
      responseSchema: SchoolMemberResponseSchema,
      mapData: toSchoolMemberEntity,
    });
  },
};
