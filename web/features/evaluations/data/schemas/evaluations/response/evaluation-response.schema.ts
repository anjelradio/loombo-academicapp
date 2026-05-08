import { z } from "zod";

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const EvaluationResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  presentation_date: dateString,
  term_id: z.uuid(),
  term_name: z.string(),
  assignment_id: z.uuid(),
  evaluation_type_id: z.uuid(),
  evaluation_type_name: z.string(),
  school_id: z.uuid(),
  is_closed: z.boolean(),
});

export const EvaluationListResponseSchema = z.object({
  evaluations: z.array(EvaluationResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export const EvaluationTypeOptionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const EvaluationTermOptionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  start_date: dateString,
  end_date: dateString,
  is_active: z.boolean(),
});

export const StudentTermAverageRowResponseSchema = z.object({
  student_id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  saber_score: z.number().nullable(),
  hacer_score: z.number().nullable(),
  ser_score: z.number().nullable(),
  autoevaluacion_score: z.number().nullable(),
  final_score: z.number().nullable(),
  status: z.enum(["calculado", "sin_calcular"]),
});

export type EvaluationResponseDto = z.infer<typeof EvaluationResponseSchema>;
export type EvaluationListResponseDto = z.infer<typeof EvaluationListResponseSchema>;
export type EvaluationTypeOptionResponseDto = z.infer<typeof EvaluationTypeOptionResponseSchema>;
export type EvaluationTermOptionResponseDto = z.infer<typeof EvaluationTermOptionResponseSchema>;
export type StudentTermAverageRowResponseDto = z.infer<typeof StudentTermAverageRowResponseSchema>;
