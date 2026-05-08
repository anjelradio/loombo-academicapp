"use server";

import { authRepository } from "../../../data/repositories";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import type { AuthUser } from "@/features/auth/domain/entities/auth-user";
import { cookies } from "next/headers";

export async function loginUser(data: unknown): Promise<ApiResult<AuthUser>> {
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
