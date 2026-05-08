"use server";

import { accountRepository } from "../../../data/repositories";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import type { AuthUser } from "@/features/auth/domain/entities/auth-user";

export async function updateProfileInfo(data: unknown): Promise<ApiResult<AuthUser>> {
  return accountRepository.updateProfileInfo(data);
}
