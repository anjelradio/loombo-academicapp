"use server";

import { accountRepository } from "../../../data/repositories/account.repository";

export async function updatePassword(data: unknown) {
  return accountRepository.updatePassword(data);
}
