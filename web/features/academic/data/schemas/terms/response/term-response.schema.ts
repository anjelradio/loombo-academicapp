import { z } from "zod";

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const TermResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  start_date: dateString,
  end_date: dateString,
  school_id: z.uuid(),
});

export const TermListResponseSchema = z.array(TermResponseSchema);

export type TermResponseDto = z.infer<typeof TermResponseSchema>;
export type TermListResponseDto = z.infer<typeof TermListResponseSchema>;
