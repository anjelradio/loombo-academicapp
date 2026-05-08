import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import type {
  AttendanceSession,
  AttendanceSessionList,
} from "../../domain/entities/attendance-session";
import type {
  AttendanceFinalizeSummary,
  AttendanceGradebookRow,
  AttendanceStatusOption,
} from "../../domain/entities/attendance-gradebook";

import {
  toAttendanceFinalizeSummaryEntity,
  toAttendanceGradebookRowEntity,
  toAttendanceRecordUpsertRequestDto,
  toAttendanceStatusOptionEntity,
  toAttendanceSessionCreateRequestDto,
  toAttendanceSessionEntity,
  toAttendanceSessionListEntity,
} from "../mappers";
import {
  AttendanceFinalizeSummaryResponseSchema,
  AttendanceGradebookRowResponseSchema,
  AttendanceRecordUpsertSchema,
  AttendanceStatusOptionResponseSchema,
  AttendanceSessionCreateSchema,
  AttendanceSessionListResponseSchema,
  AttendanceSessionResponseSchema,
} from "../schemas";

const baseUrl = `${env.API_URL}/attendance`;

export const attendanceSessionApi = {
  async getSessionsByAssignment(
    schoolId: string,
    assignmentId: string,
    page = 1,
    perPage = 8,
  ): Promise<ApiResult<AttendanceSessionList>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignments/${assignmentId}/sessions?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las asistencias.",
      responseSchema: AttendanceSessionListResponseSchema,
      mapData: toAttendanceSessionListEntity,
    });
  },

  async createSession(schoolId: string, data: unknown): Promise<ApiResult<AttendanceSession>> {
    const input = parseWithSchema(AttendanceSessionCreateSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/sessions`,
      method: "POST",
      token,
      body: toAttendanceSessionCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la sesion de asistencia.",
      responseSchema: AttendanceSessionResponseSchema,
      mapData: toAttendanceSessionEntity,
    });
  },

  async getSessionById(schoolId: string, sessionId: string): Promise<ApiResult<AttendanceSession>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/sessions/${sessionId}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener la sesion de asistencia.",
      responseSchema: AttendanceSessionResponseSchema,
      mapData: toAttendanceSessionEntity,
    });
  },

  async getStatusOptions(schoolId: string): Promise<ApiResult<AttendanceStatusOption[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/status-options`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los estados de asistencia.",
      responseSchema: AttendanceStatusOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toAttendanceStatusOptionEntity),
    });
  },

  async getGradebookBySession(schoolId: string, sessionId: string): Promise<ApiResult<AttendanceGradebookRow[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/sessions/${sessionId}/gradebook`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener el listado de asistencia.",
      responseSchema: AttendanceGradebookRowResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toAttendanceGradebookRowEntity),
    });
  },

  async upsertRecordBySessionStudent(
    schoolId: string,
    sessionId: string,
    studentId: string,
    data: unknown,
  ): Promise<ApiResult<AttendanceGradebookRow>> {
    const input = parseWithSchema(AttendanceRecordUpsertSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/sessions/${sessionId}/students/${studentId}/record`,
      method: "PUT",
      token,
      body: toAttendanceRecordUpsertRequestDto(input.data),
      fallbackMessage: "No se pudo registrar la asistencia.",
      responseSchema: AttendanceGradebookRowResponseSchema,
      mapData: toAttendanceGradebookRowEntity,
    });
  },

  async finalizeSession(schoolId: string, sessionId: string): Promise<ApiResult<AttendanceFinalizeSummary>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/sessions/${sessionId}/finalize`,
      method: "POST",
      token,
      fallbackMessage: "No se pudo finalizar la sesion de asistencia.",
      responseSchema: AttendanceFinalizeSummaryResponseSchema,
      mapData: toAttendanceFinalizeSummaryEntity,
    });
  },

  async deleteSession(schoolId: string, sessionId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/sessions/${sessionId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar la sesion de asistencia.",
    });
  },
};
