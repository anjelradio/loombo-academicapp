import { z } from "zod";

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const AttendanceSessionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  attendance_date: dateString,
  is_closed: z.boolean(),
  assignment_id: z.uuid(),
  term_id: z.uuid(),
  term_name: z.string(),
  school_id: z.uuid(),
});

export const AttendanceSessionListResponseSchema = z.object({
  sessions: z.array(AttendanceSessionResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export type AttendanceSessionResponseDto = z.infer<typeof AttendanceSessionResponseSchema>;
export type AttendanceSessionListResponseDto = z.infer<typeof AttendanceSessionListResponseSchema>;
