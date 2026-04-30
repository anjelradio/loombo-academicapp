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
  toSchoolEntity,
  toSchoolEntityList,
} from "../mappers/school/school.mapper";
import {
  toSchoolMemberEntity,
  toSchoolMemberEntityList,
} from "../mappers/school-member/school-member.mapper";
import type {
  SchoolActionResult,
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
      body: input.data,
      fallbackMessage: "No se pudo crear la escuela.",
      responseSchema: SchoolResponseSchema,
      mapData: toSchoolEntity,
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

    const query = role ? `?role=${role}` : "";
    return apiRequestJson({
      url: `${baseUrl}/${schoolId}/users${query}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los usuarios de la escuela.",
      responseSchema: SchoolMemberResponseListSchema,
      mapData: toSchoolMemberEntityList,
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
