import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import type { Invitation } from "../../domain/entities/invitation";
import {
  errorResult,
} from "@/features/shared/infrastructure/errors/api-error-result";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";

import {
  InvitationCreateFormSchema,
  InvitationResponseListSchema,
} from "../schemas";
import {
  toInvitationCreateRequestDto,
  toInvitationEntityList,
} from "../mappers";

const baseUrl = `${env.API_URL}/schools`;

export const invitationApi = {
  async getSchoolInvitations(schoolId: string): Promise<ApiResult<Invitation[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/${schoolId}/invite`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las invitaciones.",
      responseSchema: InvitationResponseListSchema,
      mapData: toInvitationEntityList,
    });
  },

  async createInvitation(schoolId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(InvitationCreateFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/${schoolId}/invite`,
      method: "POST",
      token,
      body: toInvitationCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la invitacion.",
    });
  },

  async deleteInvitation(schoolId: string, invitationId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/${schoolId}/invite/${invitationId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar la invitacion.",
    });
  },
};
