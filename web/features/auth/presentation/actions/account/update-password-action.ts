"use server";

import { accountRepository } from "../../../data/repositories/account.repository";
import type { UpdatePasswordResult } from "../../../data/types/account.types";

export async function updatePassword(data: unknown): Promise<UpdatePasswordResult> {
  return accountRepository.updatePassword(data);
}
