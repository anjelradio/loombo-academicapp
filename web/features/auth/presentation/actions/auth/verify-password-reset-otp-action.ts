"use server";

import { authRepository } from "../../../data/repositories/auth.repository";

export async function verifyPasswordResetOtp(data: unknown) {
  return authRepository.verifyPasswordResetOtp(data);
}
