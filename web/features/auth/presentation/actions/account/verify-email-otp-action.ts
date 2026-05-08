"use server";

import { accountRepository } from "../../../data/repositories";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import type { VerifyEmailOtpInfo } from "@/features/auth/domain/entities/email-otp";

export async function verifyEmailOtp(data: unknown): Promise<ApiResult<VerifyEmailOtpInfo>> {
  return accountRepository.verifyEmailOtp(data);
}
