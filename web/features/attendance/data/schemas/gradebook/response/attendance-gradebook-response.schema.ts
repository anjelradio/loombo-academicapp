import { z } from "zod";

export const AttendanceStatusOptionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const AttendanceGradebookRowResponseSchema = z.object({
  student_id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  attendance_record_id: z.uuid().nullable(),
  status_id: z.uuid().nullable(),
  status_name: z.string().nullable(),
  observation: z.string().nullable(),
  status: z.enum(["sin_registrar", "registrado"]),
});

export const AttendanceFinalizeSummaryResponseSchema = z.object({
  created_missing: z.number(),
  total_students: z.number(),
});

export type AttendanceStatusOptionResponseDto = z.infer<typeof AttendanceStatusOptionResponseSchema>;
export type AttendanceGradebookRowResponseDto = z.infer<typeof AttendanceGradebookRowResponseSchema>;
export type AttendanceFinalizeSummaryResponseDto = z.infer<typeof AttendanceFinalizeSummaryResponseSchema>;
