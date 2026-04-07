"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";
import { AuthUserSchema } from "@/lib/schemas/auth.schema";
import { UpdateUserProfileFormSchema } from "@/lib/schemas/user.schema";

const baseUrl = `${env.API_URL}/users`;

export async function updateProfileInfo(data: unknown) {
  const result = UpdateUserProfileFormSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((e) => e.message),
    };
  }

  const token = await getToken();
  if (!token) {
    return {
      ok: false,
      errors: ["No autorizado"],
    };
  }

  try {
    const res = await fetch(`${baseUrl}/me/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result.data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        errors: parseError(responseData),
      };
    }

    const parsed = AuthUserSchema.safeParse(responseData);
    if (!parsed.success) {
      return {
        ok: false,
        errors: ["Error en la respuesta del servidor"],
      };
    }

    return {
      ok: true,
      data: parsed.data,
    };
  } catch {
    return {
      ok: false,
      errors: ["Error de conexion o del servidor"],
    };
  }
}
