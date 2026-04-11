"use server";

import { accountRepository } from "../../../data/repositories/account.repository";

export async function requestEmailOtp() {
  return accountRepository.requestEmailOtp();
}
