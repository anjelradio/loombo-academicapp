import type { z } from "zod";
import {
  RequestEmailOtpResponseSchema,
  VerifyEmailOtpResponseSchema,
} from "../../../schemas/account/response";
import type {
  RequestEmailOtpInfo,
  VerifyEmailOtpInfo,
} from "../../../../domain/entities/email-otp";

export function toRequestEmailOtpEntity(
  dto: z.infer<typeof RequestEmailOtpResponseSchema>,
): RequestEmailOtpInfo {
  return {
    message: dto.message,
    expiresInSeconds: dto.expires_in_seconds,
  };
}

export function toVerifyEmailOtpEntity(
  dto: z.infer<typeof VerifyEmailOtpResponseSchema>,
): VerifyEmailOtpInfo {
  return {
    message: dto.message,
    emailChangeToken: dto.email_change_token,
    expiresInSeconds: dto.expires_in_seconds,
  };
}
