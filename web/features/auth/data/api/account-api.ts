import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";

import {
  RequestEmailOtpResponseSchema,
  UpdateEmailFormSchema,
  UpdateEmailResponseSchema,
  UpdatePasswordFormSchema,
  UpdateUserProfileFormSchema,
  VerifyEmailOtpFormSchema,
  VerifyEmailOtpResponseSchema,
} from "../schemas/account.schema";

const baseUrl = `${env.API_URL}/users`;

export const accountApi = {
  async requestEmailOtp() {
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
  },

  async verifyEmailOtp(data: unknown) {
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
  },

  async updateEmail(data: unknown) {
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
  },

  async updatePassword(data: unknown) {
    const result = UpdatePasswordFormSchema.safeParse(data);
    if (!result.success) {
      return { ok: false, errors: result.error.issues.map((e) => e.message) };
    }

    const token = await getToken();
    if (!token) {
      return { ok: false, errors: ["No autorizado"] };
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
        return { ok: false, errors: parseError(responseData) };
      }

      return { ok: true };
    } catch {
      return { ok: false, errors: ["Error de conexion o del servidor"] };
    }
  },

  async updateProfileInfo(data: unknown) {
    const result = UpdateUserProfileFormSchema.safeParse(data);
    if (!result.success) {
      return { ok: false, errors: result.error.issues.map((e) => e.message) };
    }

    const token = await getToken();
    if (!token) {
      return { ok: false, errors: ["No autorizado"] };
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
  },
};
