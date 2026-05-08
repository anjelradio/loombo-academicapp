import { z } from "zod";

export const StudentGradebookRowResponseSchema = z.object({
  student_id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  score: z.number().nullable(),
  observation: z.string().nullable(),
  evaluation_grade_id: z.uuid().nullable(),
  status: z.enum(["sin_calificar", "calificado"]),
});

export const EvaluationFinalizeSummaryResponseSchema = z.object({
  created_missing: z.number(),
  total_students: z.number(),
});

export type StudentGradebookRowResponseDto = z.infer<typeof StudentGradebookRowResponseSchema>;
export type EvaluationFinalizeSummaryResponseDto = z.infer<typeof EvaluationFinalizeSummaryResponseSchema>;
