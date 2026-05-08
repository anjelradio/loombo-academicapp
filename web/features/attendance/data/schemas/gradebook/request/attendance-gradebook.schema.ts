import { z } from "zod";

export const AttendanceRecordUpsertSchema = z.object({
  statusId: z.uuid(),
  observation: z.string().max(300).optional().or(z.literal("")),
});

export type AttendanceRecordUpsertData = z.infer<typeof AttendanceRecordUpsertSchema>;
