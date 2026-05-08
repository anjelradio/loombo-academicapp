"use server";

import { authRepository } from "../../../data/repositories";

export async function requestPasswordResetOtp(data: unknown) {
  return authRepository.requestPasswordResetOtp(data);
}
