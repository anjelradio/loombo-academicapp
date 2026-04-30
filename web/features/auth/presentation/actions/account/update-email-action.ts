"use server";

import { accountRepository } from "../../../data/repositories/account.repository";
import type { UpdateEmailResult } from "../../../data/types/account.types";

export async function updateEmail(data: unknown): Promise<UpdateEmailResult> {
  return accountRepository.updateEmail(data);
}
