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
  AssignmentCourseOption,
  AssignmentSubjectOption,
  AssignmentTeacherList,
  TeacherAssignments,
} from "../../domain/entities/assignment";
import type { TeacherAssignmentContextCourseGroup } from "../../domain/entities/teacher-assignment-context";

import {
  toAssignmentCourseOptionEntity,
  toAssignmentCreateRequestDto,
  toAssignmentSubjectOptionEntity,
  toAssignmentTeacherListEntity,
  toTeacherAssignmentContextCourseGroupEntity,
  toAssignmentUpdateRequestDto,
  toTeacherAssignmentsEntity,
} from "../mappers/assignments";
import {
  AssignmentCourseOptionResponseSchema,
  AssignmentSubjectOptionResponseSchema,
  AssignmentTeacherListResponseSchema,
  TeacherAssignmentContextCourseGroupResponseSchema,
  TeacherAssignmentsResponseSchema,
} from "../schemas/assignments";
import {
  AssignmentCreateSchema,
  AssignmentUpdateSchema,
} from "../schemas/assignments";

const baseUrl = `${env.API_URL}/academic`;

export const assignmentApi = {
  async getTeacherAssignmentGroups(schoolId: string): Promise<ApiResult<TeacherAssignmentContextCourseGroup[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/teacher/assignment-groups`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las asignaciones del docente.",
      responseSchema: TeacherAssignmentContextCourseGroupResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toTeacherAssignmentContextCourseGroupEntity),
    });
  },

  async getAssignmentGroupsForContext(
    schoolId: string,
  ): Promise<ApiResult<TeacherAssignmentContextCourseGroup[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignment-groups`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las asignaciones.",
      responseSchema: TeacherAssignmentContextCourseGroupResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toTeacherAssignmentContextCourseGroupEntity),
    });
  },

  async getAssignmentTeachers(
    schoolId: string,
    page = 1,
    perPage = 8,
    search?: string,
  ): Promise<ApiResult<AssignmentTeacherList>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (search && search.trim()) params.set("search", search.trim());

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignment-teachers?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los docentes.",
      responseSchema: AssignmentTeacherListResponseSchema,
      mapData: toAssignmentTeacherListEntity,
    });
  },

  async getAssignmentCourseOptions(schoolId: string): Promise<ApiResult<AssignmentCourseOption[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignment-course-options`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los cursos disponibles.",
      responseSchema: AssignmentCourseOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toAssignmentCourseOptionEntity),
    });
  },

  async getAssignmentSubjectOptions(
    schoolId: string,
    courseId: string,
  ): Promise<ApiResult<AssignmentSubjectOption[]>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/assignment-subject-options/${courseId}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las materias del curso.",
      responseSchema: AssignmentSubjectOptionResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toAssignmentSubjectOptionEntity),
    });
  },

  async getTeacherAssignments(schoolId: string, teacherId: string): Promise<ApiResult<TeacherAssignments>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/teachers/${teacherId}/assignments`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las asignaciones del docente.",
      responseSchema: TeacherAssignmentsResponseSchema,
      mapData: toTeacherAssignmentsEntity,
    });
  },

  async createTeacherAssignment(
    schoolId: string,
    teacherId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(AssignmentCreateSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/teachers/${teacherId}/assignments`,
      method: "POST",
      token,
      body: toAssignmentCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear la asignacion.",
    });
  },

  async updateTeacherAssignment(
    schoolId: string,
    teacherId: string,
    courseId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(AssignmentUpdateSchema, data);
    if (!input.ok) return input;

    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/teachers/${teacherId}/assignments/${courseId}`,
      method: "PUT",
      token,
      body: toAssignmentUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar la asignacion.",
    });
  },

  async deleteTeacherAssignment(
    schoolId: string,
    teacherId: string,
    courseId: string,
  ): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/teachers/${teacherId}/assignments/${courseId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar la asignacion.",
    });
  },
};
