"use server";

import { parseError } from "@/lib/api/error-parser";
import { env } from "@/lib/config/env";
import {
  LoginFormSchema,
  LoginResponseSchema,
} from "@/lib/schemas/auth.schema";
import { cookies } from "next/headers";

const baseUrl = `${env.API_URL}/auth`;

export async function login(data: unknown) {
  const result = LoginFormSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((e) => e.message),
    };
  }

  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        errors: parseError(responseData),
      };
    }

    const parsed = LoginResponseSchema.safeParse(responseData);
    if (!parsed.success) {
      return {
        ok: false,
        errors: ["Error en la respuesta del servidor"],
      };
    }

    const { access_token, user } = parsed.data;
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });

    return {
      ok: true,
      data: user
    }

  } catch (error) {
    return {
      ok: false,
      errors: ["Error de conexión o del servidor"],
    };
  }
}
