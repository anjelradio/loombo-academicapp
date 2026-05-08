import { z } from "zod";

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const StudentResponseSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: dateString,
  school_id: z.uuid(),
});

export const StudentListResponseSchema = z.object({
  students: z.array(StudentResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export type StudentResponseDto = z.infer<typeof StudentResponseSchema>;
export type StudentListResponseDto = z.infer<typeof StudentListResponseSchema>;
