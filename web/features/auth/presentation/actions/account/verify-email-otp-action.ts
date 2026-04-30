"use server";

import { accountRepository } from "../../../data/repositories/account.repository";
import type { VerifyEmailOtpResult } from "../../../data/types/account.types";

export async function verifyEmailOtp(data: unknown): Promise<VerifyEmailOtpResult> {
  return accountRepository.verifyEmailOtp(data);
}
