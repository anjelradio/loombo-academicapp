"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";
import { UpdatePasswordFormSchema } from "@/lib/schemas/user.schema";

const baseUrl = `${env.API_URL}/users`;

export async function updatePassword(data: unknown) {
  const result = UpdatePasswordFormSchema.safeParse(data);
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
    const res = await fetch(`${baseUrl}/me/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      const responseData = await res.json();
      return {
        ok: false,
        errors: parseError(responseData),
      };
    }

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      errors: ["Error de conexion o del servidor"],
    };
  }
}
