"use server";

import { accountRepository } from "../../../data/repositories";
import type { ApiActionResult } from "@/features/shared/infrastructure/types/api-resource";

export async function updatePassword(data: unknown): Promise<ApiActionResult> {
  return accountRepository.updatePassword(data);
}
