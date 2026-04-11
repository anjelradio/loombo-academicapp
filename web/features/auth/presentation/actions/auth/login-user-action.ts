"use server";

import { authRepository } from "../../../data/repositories/auth.repository";
import type { AuthActionResult } from "../../../data/types/auth.types";
import { cookies } from "next/headers";

export async function loginUser(data: unknown): Promise<AuthActionResult> {
  const response = await authRepository.login(data);

  if (!response.ok) {
    return response;
  }

  const cookieStore = await cookies();
  cookieStore.set("access_token", response.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return {
    ok: true,
    data: response.data.user,
  };
}

export { loginUser as login };
