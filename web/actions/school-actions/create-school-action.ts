"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";
import { SchoolCreateSchema, SchoolSchema } from "@/lib/schemas/school.schema";

const baseUrl = `${env.API_URL}/school`;

export async function createSchool(data: unknown) {
  const result = SchoolCreateSchema.safeParse(data);
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
    const res = await fetch(baseUrl, {
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

    const parsed = SchoolSchema.safeParse(responseData);
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
