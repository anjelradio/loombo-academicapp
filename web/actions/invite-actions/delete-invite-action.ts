"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";

const baseUrl = `${env.API_URL}/school`;

export async function deleteInvite(schoolId: string, inviteId: string) {
  const token = await getToken();
  if (!token) {
    return {
      ok: false,
      errors: ["No autorizado"],
    };
  }

  try {
    const res = await fetch(`${baseUrl}/${schoolId}/invite/${inviteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const responseData = await res.json();
      return {
        ok: false,
        errors: parseError(responseData),
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      errors: ["Error de conexion o del servidor"],
    };
  }
}
