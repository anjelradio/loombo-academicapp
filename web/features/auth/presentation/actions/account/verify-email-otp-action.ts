"use server";

import { accountRepository } from "../../../data/repositories/account.repository";

export async function verifyEmailOtp(data: unknown) {
  return accountRepository.verifyEmailOtp(data);
}
