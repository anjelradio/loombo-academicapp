"use server";

import { accountRepository } from "../../../data/repositories/account.repository";

export async function updateProfileInfo(data: unknown) {
  return accountRepository.updateProfileInfo(data);
}
