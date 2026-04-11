"use server";

import { accountRepository } from "../../../data/repositories/account.repository";

export async function updateEmail(data: unknown) {
  return accountRepository.updateEmail(data);
}
