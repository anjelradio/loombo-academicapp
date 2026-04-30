import { env } from "@/features/shared/infrastructure/config/env";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import type { ApiActionResult } from "@/features/shared/infrastructure/types/api-resource";
import type {
  AuthResult,
} from "../types/auth.types";
import {
  LoginFormSchema,
  LoginResponseSchema,
  RequestPasswordResetOtpFormSchema,
  RegisterFormSchema,
  VerifyPasswordResetOtpFormSchema,
} from "../schemas/auth";
import { toAuthSessionEntity } from "../mappers/auth/auth-session.mapper";
import { toRegisterRequestDto } from "../mappers/auth/register.mapper";

const baseUrl = `${env.API_URL}/auth`;

export const authApi = {
  async login(data: unknown): Promise<AuthResult> {
    const input = parseWithSchema(LoginFormSchema, data);
    if (!input.ok) {
      return input;
    }

    return apiRequestJson({
      url: `${baseUrl}/login`,
      method: "POST",
      body: input.data,
      fallbackMessage: "Error al iniciar sesion.",
      responseSchema: LoginResponseSchema,
      mapData: toAuthSessionEntity,
    });
  },

  async register(data: unknown): Promise<AuthResult> {
    const input = parseWithSchema(RegisterFormSchema, data);
    if (!input.ok) {
      return input;
    }

    return apiRequestJson({
      url: `${baseUrl}/register`,
      method: "POST",
      body: toRegisterRequestDto(input.data),
      fallbackMessage: "Error al registrarse.",
      responseSchema: LoginResponseSchema,
      mapData: toAuthSessionEntity,
    });
  },

  async requestPasswordResetOtp(data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(RequestPasswordResetOtpFormSchema, data);
    if (!input.ok) {
      return input;
    }

    return apiRequestStatus({
      url: `${baseUrl}/password/request-otp`,
      method: "POST",
      body: input.data,
      fallbackMessage: "Error al solicitar codigo OTP.",
    });
  },

  async verifyPasswordResetOtp(data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(VerifyPasswordResetOtpFormSchema, data);
    if (!input.ok) {
      return input;
    }

    return apiRequestStatus({
      url: `${baseUrl}/password/verify-otp`,
      method: "POST",
      body: input.data,
      fallbackMessage: "Error al verificar codigo OTP.",
    });
  },
};
