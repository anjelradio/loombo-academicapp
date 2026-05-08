import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";
import type { Course, CourseFormOptions, CourseList } from "../../domain/entities/course";

import {
  toCourseCreateRequestDto,
  toCourseEntity,
  toCourseFormOptionsEntity,
  toCourseListEntity,
  toCourseUpdateRequestDto,
} from "../mappers/courses";
import {
  CourseResponseSchema,
  CourseFormOptionsResponseSchema,
  CourseListResponseSchema,
} from "../schemas/courses";
import {
  CourseCreateSchema,
  CourseUpdateSchema,
} from "../schemas/courses";

const baseUrl = `${env.API_URL}/academic`;

export const courseApi = {
  async getCoursesBySchool(
    schoolId: string,
    page = 1,
    perPage = 8,
    search?: string,
  ): Promise<ApiResult<CourseList>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (search && search.trim()) {
      params.set("search", search.trim());
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/courses?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los cursos.",
      responseSchema: CourseListResponseSchema,
      mapData: toCourseListEntity,
    });
  },

  async getCourseFormOptions(schoolId: string): Promise<ApiResult<CourseFormOptions>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/course-form-options`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener las opciones del formulario.",
      responseSchema: CourseFormOptionsResponseSchema,
      mapData: toCourseFormOptionsEntity,
    });
  },

  async getCourseById(schoolId: string, courseId: string): Promise<ApiResult<Course>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener el curso.",
      responseSchema: CourseResponseSchema,
      mapData: toCourseEntity,
    });
  },

  async createCourse(schoolId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(CourseCreateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/courses`,
      method: "POST",
      token,
      body: toCourseCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear el curso.",
    });
  },

  async updateCourse(
    schoolId: string,
    courseId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(CourseUpdateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}`,
      method: "PUT",
      token,
      body: toCourseUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar el curso.",
    });
  },

  async deleteCourse(schoolId: string, courseId: string): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo eliminar el curso.",
    });
  },
};
