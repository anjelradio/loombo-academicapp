"use server";

import { accountRepository } from "../../../data/repositories/account.repository";
import type { RequestEmailOtpResult } from "../../../data/types/account.types";

export async function requestEmailOtp(): Promise<RequestEmailOtpResult> {
  return accountRepository.requestEmailOtp();
}
