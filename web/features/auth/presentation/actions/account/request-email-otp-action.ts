"use server";

import { accountRepository } from "../../../data/repositories";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import type { RequestEmailOtpInfo } from "@/features/auth/domain/entities/email-otp";

export async function requestEmailOtp(): Promise<ApiResult<RequestEmailOtpInfo>> {
  return accountRepository.requestEmailOtp();
}
