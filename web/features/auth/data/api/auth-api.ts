import { env } from "@/lib/config/env";
import { parseError } from "@/lib/api/error-parser";
import type { AuthResult } from "../types/auth.types";
import {
  LoginFormSchema,
  LoginResponseSchema,
  RegisterFormSchema,
} from "../schemas/auth.schema";

const baseUrl = `${env.API_URL}/auth`;

export async function login(data: unknown): Promise<AuthResult> {
  const result = LoginFormSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((issue) => issue.message),
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

    return {
      ok: true,
      data: {
        accessToken: parsed.data.access_token,
        user: parsed.data.user,
      },
    };
  } catch {
    return {
      ok: false,
      errors: ["Error de conexión o del servidor"],
    };
  }
}

export async function register(data: unknown): Promise<AuthResult> {
  const result = RegisterFormSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const res = await fetch(`${baseUrl}/register`, {
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

    return {
      ok: true,
      data: {
        accessToken: parsed.data.access_token,
        user: parsed.data.user,
      },
    };
  } catch {
    return {
      ok: false,
      errors: ["Error de conexión o del servidor"],
    };
  }
}

export const authApi = {
  login,
  register,
};
