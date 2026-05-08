"use server";

import { authRepository } from "../../../data/repositories";

export async function verifyPasswordResetOtp(data: unknown) {
  return authRepository.verifyPasswordResetOtp(data);
}
