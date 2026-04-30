"use server";

import { authRepository } from "../../../data/repositories/auth.repository";

export async function requestPasswordResetOtp(data: unknown) {
  return authRepository.requestPasswordResetOtp(data);
}
