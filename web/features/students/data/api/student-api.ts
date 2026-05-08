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
import type { Student, StudentList } from "../../domain/entities/student";
import type {
  EvaluationFinalizeSummary,
  StudentGradebookRow,
} from "../../domain/entities/student-gradebook";

import {
  toEvaluationFinalizeSummaryEntity,
  toStudentCreateRequestDto,
  toStudentEntity,
  toStudentGradeUpsertRequestDto,
  toStudentGradebookRowEntity,
  toStudentListEntity,
  toStudentUpdateRequestDto,
} from "../mappers";
import {
  EvaluationFinalizeSummaryResponseSchema,
  StudentCreateSchema,
  StudentGradeUpsertSchema,
  StudentGradebookRowResponseSchema,
  StudentListResponseSchema,
  StudentResponseSchema,
  StudentUpdateSchema,
} from "../schemas";

const baseUrl = `${env.API_URL}/students`;

export const studentApi = {
  async getStudentsByEvaluation(schoolId: string, evaluationId: string): Promise<ApiResult<Student[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}/students`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los estudiantes de la evaluacion.",
      responseSchema: StudentResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toStudentEntity),
    });
  },

  async getGradebookByEvaluation(
    schoolId: string,
    evaluationId: string,
  ): Promise<ApiResult<StudentGradebookRow[]>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}/gradebook`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener el gradebook.",
      responseSchema: StudentGradebookRowResponseSchema.array(),
      mapData: (dtoList) => dtoList.map(toStudentGradebookRowEntity),
    });
  },

  async upsertGradeByEvaluationStudent(
    schoolId: string,
    evaluationId: string,
    studentId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(StudentGradeUpsertSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}/students/${studentId}/grade`,
      method: "PUT",
      token,
      body: toStudentGradeUpsertRequestDto(input.data),
      fallbackMessage: "No se pudo guardar la calificacion.",
    });
  },

  async finalizeEvaluation(schoolId: string, evaluationId: string): Promise<ApiResult<EvaluationFinalizeSummary>> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/evaluations/${evaluationId}/finalize`,
      method: "POST",
      token,
      fallbackMessage: "No se pudo finalizar la evaluacion.",
      responseSchema: EvaluationFinalizeSummaryResponseSchema,
      mapData: toEvaluationFinalizeSummaryEntity,
    });
  },

  async getStudentsByCourse(
    schoolId: string,
    courseId: string,
    page = 1,
    perPage = 8,
    search?: string,
  ): Promise<ApiResult<StudentList>> {
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
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}?${params.toString()}`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudieron obtener los estudiantes del curso.",
      responseSchema: StudentListResponseSchema,
      mapData: toStudentListEntity,
    });
  },

  async createStudentInCourse(
    schoolId: string,
    courseId: string,
    data: unknown,
  ): Promise<ApiActionResult> {
    const input = parseWithSchema(StudentCreateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}`,
      method: "POST",
      token,
      body: toStudentCreateRequestDto(input.data),
      fallbackMessage: "No se pudo crear el estudiante.",
    });
  },

  async updateStudent(schoolId: string, studentId: string, data: unknown): Promise<ApiActionResult> {
    const input = parseWithSchema(StudentUpdateSchema, data);
    if (!input.ok) {
      return input;
    }

    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/students/${studentId}`,
      method: "PUT",
      token,
      body: toStudentUpdateRequestDto(input.data),
      fallbackMessage: "No se pudo actualizar el estudiante.",
    });
  },

  async unlinkStudentFromCourse(
    schoolId: string,
    courseId: string,
    studentId: string,
  ): Promise<ApiActionResult> {
    const token = await getToken();
    if (!token) {
      return errorResult("No autorizado");
    }

    return apiRequestStatus({
      url: `${baseUrl}/schools/${schoolId}/courses/${courseId}/students/${studentId}`,
      method: "DELETE",
      token,
      fallbackMessage: "No se pudo desvincular el estudiante del curso.",
    });
  },
};
