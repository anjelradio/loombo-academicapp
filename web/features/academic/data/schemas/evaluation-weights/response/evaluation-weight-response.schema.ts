import { z } from "zod";

export const EvaluationWeightResponseSchema = z.object({
  id: z.uuid(),
  school_id: z.uuid(),
  school_level_id: z.uuid(),
  ser: z.number(),
  saber: z.number(),
  hacer: z.number(),
  autoevaluacion: z.number(),
});

export const EvaluationWeightLevelsResponseSchema = z.array(
  z.object({
    school_level_id: z.uuid(),
    level_name: z.string(),
    has_configured: z.boolean(),
    ser: z.number().nullable().optional(),
    saber: z.number().nullable().optional(),
    hacer: z.number().nullable().optional(),
    autoevaluacion: z.number().nullable().optional(),
  }),
);

export type EvaluationWeightResponseDto = z.infer<typeof EvaluationWeightResponseSchema>;
export type EvaluationWeightLevelsResponseDto = z.infer<typeof EvaluationWeightLevelsResponseSchema>;
