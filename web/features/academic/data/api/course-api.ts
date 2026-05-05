import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import {
  apiRequestJson,
  apiRequestStatus,
} from "@/features/shared/infrastructure/api/api-client";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import { parseWithSchema } from "@/features/shared/infrastructure/api/parse-with-schema";

import {
  toCourseFormOptionsEntity,
  toCourseListEntity,
} from "../mappers/courses/course.mapper";
import {
  CourseFormOptionsResponseSchema,
  CourseListResponseSchema,
} from "../schemas/courses/course-response.schema";
import {
  CourseCreateSchema,
  CourseUpdateSchema,
} from "../schemas/courses/course.schema";
import type {
  CourseActionResult,
  CourseFormOptionsResult,
  CourseListResult,
} from "../types/course.types";

const baseUrl = `${env.API_URL}/academic`;

export const courseApi = {
  async getCoursesBySchool(
    schoolId: string,
    page = 1,
    perPage = 8,
    search?: string,
  ): Promise<CourseListResult> {
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

  async getCourseFormOptions(schoolId: string): Promise<CourseFormOptionsResult> {
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

  async createCourse(schoolId: string, data: unknown): Promise<CourseActionResult> {
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
      body: {
        name: input.data.name,
        school_level_id: input.data.schoolLevelId,
        subject_ids: input.data.subjectIds,
      },
      fallbackMessage: "No se pudo crear el curso.",
    });
  },

  async updateCourse(
    schoolId: string,
    courseId: string,
    data: unknown,
  ): Promise<CourseActionResult> {
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
      body: {
        name: input.data.name,
        school_level_id: input.data.schoolLevelId,
        subject_ids: input.data.subjectIds,
      },
      fallbackMessage: "No se pudo actualizar el curso.",
    });
  },

  async deleteCourse(schoolId: string, courseId: string): Promise<CourseActionResult> {
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
