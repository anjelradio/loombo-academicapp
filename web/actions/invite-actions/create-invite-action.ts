"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";
import { InviteCreateFormSchema, InviteSchema } from "@/lib/schemas/invite.schema";

const baseUrl = `${env.API_URL}/school`;

export async function createInvite(schoolId: string, data: unknown) {
  const result = InviteCreateFormSchema.safeParse(data);
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
    const res = await fetch(`${baseUrl}/${schoolId}/invite`, {
      method: "POST",
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

    const parsed = InviteSchema.safeParse(responseData);
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
