"use server";

import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";
import {
  RequestEmailOtpResponseSchema,
  UpdateEmailFormSchema,
  UpdateEmailResponseSchema,
  VerifyEmailOtpFormSchema,
  VerifyEmailOtpResponseSchema,
} from "@/lib/schemas/user.schema";

const baseUrl = `${env.API_URL}/users`;

export async function requestEmailOtp() {
  const token = await getToken();
  if (!token) {
    return { ok: false, errors: ["No autorizado"] };
  }

  try {
    const res = await fetch(`${baseUrl}/me/email/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await res.json();
    if (!res.ok) {
      return { ok: false, errors: parseError(responseData) };
    }

    const parsed = RequestEmailOtpResponseSchema.safeParse(responseData);
    if (!parsed.success) {
      return { ok: false, errors: ["Error en la respuesta del servidor"] };
    }

    return { ok: true, data: parsed.data };
  } catch {
    return { ok: false, errors: ["Error de conexion o del servidor"] };
  }
}

export async function verifyEmailOtp(data: unknown) {
  const result = VerifyEmailOtpFormSchema.safeParse(data);
  if (!result.success) {
    return { ok: false, errors: result.error.issues.map((e) => e.message) };
  }

  const token = await getToken();
  if (!token) {
    return { ok: false, errors: ["No autorizado"] };
  }

  try {
    const res = await fetch(`${baseUrl}/me/email/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result.data),
    });

    const responseData = await res.json();
    if (!res.ok) {
      return { ok: false, errors: parseError(responseData) };
    }

    const parsed = VerifyEmailOtpResponseSchema.safeParse(responseData);
    if (!parsed.success) {
      return { ok: false, errors: ["Error en la respuesta del servidor"] };
    }

    return { ok: true, data: parsed.data };
  } catch {
    return { ok: false, errors: ["Error de conexion o del servidor"] };
  }
}

export async function updateEmail(data: unknown) {
  const result = UpdateEmailFormSchema.safeParse(data);
  if (!result.success) {
    return { ok: false, errors: result.error.issues.map((e) => e.message) };
  }

  const token = await getToken();
  if (!token) {
    return { ok: false, errors: ["No autorizado"] };
  }

  try {
    const res = await fetch(`${baseUrl}/me/email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result.data),
    });

    const responseData = await res.json();
    if (!res.ok) {
      return { ok: false, errors: parseError(responseData) };
    }

    const parsed = UpdateEmailResponseSchema.safeParse(responseData);
    if (!parsed.success) {
      return { ok: false, errors: ["Error en la respuesta del servidor"] };
    }

    return { ok: true, data: parsed.data };
  } catch {
    return { ok: false, errors: ["Error de conexion o del servidor"] };
  }
}
