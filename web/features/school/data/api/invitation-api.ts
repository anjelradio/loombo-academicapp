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
  InvitationCreateFormSchema,
  InvitationResponseListSchema,
  InvitationResponseSchema,
} from "../schemas/invitation.schema";
import {
  toInvitationCreateRequestDto,
  toInvitationEntity,
  toInvitationEntityList,
} from "../mappers/invitation/invitation.mapper";
import type {
  InvitationActionResult,
  InvitationListResult,
  InvitationResult,
} from "../types/invitation.types";

const baseUrl = `${env.API_URL}/schools`;

export const invitationApi = {
  async getSchoolInvitations(schoolId: string): Promise<InvitationListResult> {
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

  async createInvitation(schoolId: string, data: unknown): Promise<InvitationResult> {
    const input = parseWithSchema(InvitationCreateFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/${schoolId}/invite`,
      method: "POST",
      token,
      body: toInvitationCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la invitacion.",
      responseSchema: InvitationResponseSchema,
      mapData: toInvitationEntity,
    });
  },

  async deleteInvitation(schoolId: string, invitationId: string): Promise<InvitationActionResult> {
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
