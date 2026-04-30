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
  toRequestEmailOtpEntity,
  toVerifyEmailOtpEntity,
} from "../mappers/account/email-otp.mapper";
import { toAuthUserEntity } from "../mappers/auth/auth-user.mapper";
import { toUpdateEmailRequestDto } from "../mappers/account/update-email.mapper";
import { toUpdatePasswordRequestDto } from "../mappers/account/update-password.mapper";
import { toUpdateUserProfileRequestDto } from "../mappers/account/update-profile.mapper";
import {
  RequestEmailOtpResponseSchema,
  UpdateEmailFormSchema,
  UpdateEmailResponseSchema,
  UpdatePasswordFormSchema,
  UpdateUserProfileFormSchema,
  UpdateUserProfileResponseSchema,
  VerifyEmailOtpFormSchema,
  VerifyEmailOtpResponseSchema,
} from "../schemas/account";
import type {
  RequestEmailOtpResult,
  UpdateEmailResult,
  UpdatePasswordResult,
  UpdateProfileInfoResult,
  VerifyEmailOtpResult,
} from "../types/account.types";

const baseUrl = `${env.API_URL}/users`;

export const accountApi = {
  async requestEmailOtp(): Promise<RequestEmailOtpResult> {
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

  async verifyEmailOtp(data: unknown): Promise<VerifyEmailOtpResult> {
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

  async updateEmail(data: unknown): Promise<UpdateEmailResult> {
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

  async updatePassword(data: unknown): Promise<UpdatePasswordResult> {
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

  async updateProfileInfo(data: unknown): Promise<UpdateProfileInfoResult> {
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
