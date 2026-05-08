"use server";

import { authRepository } from "../../../data/repositories";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import type { AuthUser } from "@/features/auth/domain/entities/auth-user";
import { cookies } from "next/headers";

export async function registerUser(data: unknown): Promise<ApiResult<AuthUser>> {
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
