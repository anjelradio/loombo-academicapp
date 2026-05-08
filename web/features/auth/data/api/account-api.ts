import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import type { AuthUser } from "../../domain/entities/auth-user";
import type {
  RequestEmailOtpInfo,
  VerifyEmailOtpInfo,
} from "../../domain/entities/email-otp";
import {
  errorResult,
} from "@/features/shared/infrastructure/errors/api-error-result";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";

import {
  toRequestEmailOtpEntity,
  toVerifyEmailOtpEntity,
} from "../mappers/account/response/email-otp.mapper";
import { toAuthUserEntity } from "../mappers/auth/response/auth-user.mapper";
import { toUpdateEmailRequestDto } from "../mappers/account/request/update-email.mapper";
import { toUpdatePasswordRequestDto } from "../mappers/account/request/update-password.mapper";
import { toUpdateUserProfileRequestDto } from "../mappers/account/request/update-profile.mapper";
import {
  UpdateEmailFormSchema,
  UpdatePasswordFormSchema,
  UpdateUserProfileFormSchema,
  VerifyEmailOtpFormSchema,
} from "../schemas/account/request";
import {
  RequestEmailOtpResponseSchema,
  UpdateEmailResponseSchema,
  UpdateUserProfileResponseSchema,
  VerifyEmailOtpResponseSchema,
} from "../schemas/account/response";

const baseUrl = `${env.API_URL}/auth`;

export const accountApi = {
  async requestEmailOtp(): Promise<ApiResult<RequestEmailOtpInfo>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/me/email/request-otp`,
      method: "POST",
      token,
      fallbackMessage: "No se pudo enviar el codigo OTP.",
      responseSchema: RequestEmailOtpResponseSchema,
      mapData: toRequestEmailOtpEntity,
    });
  },

  async verifyEmailOtp(data: unknown): Promise<ApiResult<VerifyEmailOtpInfo>> {
    const input = parseWithSchema(VerifyEmailOtpFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/me/email/verify-otp`,
      method: "POST",
      token,
      body: input.data,
      fallbackMessage: "No se pudo verificar el codigo OTP.",
      responseSchema: VerifyEmailOtpResponseSchema,
      mapData: toVerifyEmailOtpEntity,
    });
  },

  async updateEmail(data: unknown): Promise<ApiResult<AuthUser>> {
    const input = parseWithSchema(UpdateEmailFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/me/email`,
      method: "PATCH",
      token,
      body: toUpdateEmailRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar el correo.",
      responseSchema: UpdateEmailResponseSchema,
      mapData: toAuthUserEntity,
    });
  },

  async updatePassword(data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(UpdatePasswordFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/me/password`,
      method: "PATCH",
      token,
      body: toUpdatePasswordRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar la contrasena.",
    });
  },

  async updateProfileInfo(data: unknown): Promise<ApiResult<AuthUser>> {
    const input = parseWithSchema(UpdateUserProfileFormSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/me/profile`,
      method: "PATCH",
      token,
      body: toUpdateUserProfileRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar el perfil.",
      responseSchema: UpdateUserProfileResponseSchema,
      mapData: toAuthUserEntity,
    });
  },
};
