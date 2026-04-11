"use server";

import { authRepository } from "../../../data/repositories/auth.repository";
import type { AuthActionResult } from "../../../data/types/auth.types";
import { cookies } from "next/headers";

export async function registerUser(data: unknown): Promise<AuthActionResult> {
  const response = await authRepository.register(data);

  if (!response.ok) {
    return response;
  }

  const cookieStore = await cookies();
  cookieStore.set("access_token", response.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  return {
    ok: true,
    data: response.data.user,
  };
}

export { registerUser as register };
