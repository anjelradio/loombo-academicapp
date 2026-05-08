import { z } from "zod";

export const AttendanceSessionCreateSchema = z.object({
  attendanceDate: z.string().min(1, "Debes seleccionar una fecha"),
  assignmentId: z.uuid(),
});

export type AttendanceSessionCreateData = z.infer<typeof AttendanceSessionCreateSchema>;
