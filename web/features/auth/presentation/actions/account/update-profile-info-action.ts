"use server";

import { accountRepository } from "../../../data/repositories/account.repository";
import type { UpdateProfileInfoResult } from "../../../data/types/account.types";

export async function updateProfileInfo(data: unknown): Promise<UpdateProfileInfoResult> {
  return accountRepository.updateProfileInfo(data);
}
