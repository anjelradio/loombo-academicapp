import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { env } from "@/features/shared/infrastructure/config/env";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";

import type { SchoolMemberList } from "../../domain/entities/school-member";
import { SchoolMemberFilterRoleEnum, SchoolMemberResponseListSchema } from "../schemas";
import { toSchoolMemberListEntity } from "../mappers";

const baseUrl = `${env.API_URL}/schools`;

export const schoolMembersApi = {
  async getUsersBySchool(
    schoolId: string,
    role?: "admin" | "teacher",
    page = 1,
    perPage = 8,
    name?: string,
  ): Promise<ApiResult<SchoolMemberList>> {
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
  ): Promise<ApiActionResult> {
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
  ): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/${schoolId}/users/${targetUserId}/role`,
      method: "PATCH",
      token,
      fallbackMessage: "No se pudo actualizar el rol del usuario.",
    });
  },
};
