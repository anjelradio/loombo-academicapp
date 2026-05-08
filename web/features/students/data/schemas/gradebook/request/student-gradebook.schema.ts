import { z } from "zod";

export const StudentGradeUpsertSchema = z.object({
  score: z.coerce.number().min(0, "La nota no puede ser negativa"),
  observation: z.string().max(300).optional().or(z.literal("")),
});

export type StudentGradeUpsertData = z.infer<typeof StudentGradeUpsertSchema>;
