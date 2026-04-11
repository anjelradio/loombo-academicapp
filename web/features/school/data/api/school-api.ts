import { parseError } from "@/lib/api/error-parser";
import { getToken } from "@/lib/api/get-token";
import { env } from "@/lib/config/env";

import {
  SchoolCreateSchema,
  SchoolJoinByCodeSchema,
  SchoolListSchema,
  SchoolSchema,
} from "../schemas/school.schema";

const baseUrl = `${env.API_URL}/school`;

export const schoolApi = {
  async getSchoolsByUser() {
    const token = await getToken();
    if (!token) {
      return { ok: false, errors: ["No autorizado"] };
    }

    try {
      const res = await fetch(`${baseUrl}/by_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const responseData = await res.json();
      if (!res.ok) {
        return { ok: false, errors: parseError(responseData) };
      }

      const parsed = SchoolListSchema.safeParse(responseData);
      if (!parsed.success) {
        return { ok: false, errors: ["Error en la respuesta del servidor"] };
      }

      return { ok: true, data: parsed.data };
    } catch {
      return { ok: false, errors: ["Error de conexion o del servidor"] };
    }
  },

  async createSchool(data: unknown) {
    const result = SchoolCreateSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        errors: result.error.issues.map((e) => e.message),
      };
    }

    const token = await getToken();
    if (!token) {
      return { ok: false, errors: ["No autorizado"] };
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
        return { ok: false, errors: parseError(responseData) };
      }

      const parsed = SchoolSchema.safeParse(responseData);
      if (!parsed.success) {
        return { ok: false, errors: ["Error en la respuesta del servidor"] };
      }

      return { ok: true, data: parsed.data };
    } catch {
      return { ok: false, errors: ["Error de conexion o del servidor"] };
    }
  },

  async joinSchoolByCode(data: unknown) {
    const result = SchoolJoinByCodeSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        errors: result.error.issues.map((e) => e.message),
      };
    }

    const token = await getToken();
    if (!token) {
      return { ok: false, errors: ["No autorizado"] };
    }

    try {
      const res = await fetch(`${baseUrl}/join`, {
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

      const parsed = SchoolSchema.safeParse(responseData);
      if (!parsed.success) {
        return { ok: false, errors: ["Error en la respuesta del servidor"] };
      }

      return { ok: true, data: parsed.data };
    } catch {
      return { ok: false, errors: ["Error de conexion o del servidor"] };
    }
  },
};
