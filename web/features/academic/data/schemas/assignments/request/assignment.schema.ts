import { z } from "zod";

export const AssignmentCreateSchema = z.object({
  courseId: z.uuid(),
  subjectIds: z.array(z.uuid()).min(1, "Debes seleccionar al menos una materia"),
});

export const AssignmentUpdateSchema = z.object({
  subjectIds: z.array(z.uuid()).min(1, "Debes seleccionar al menos una materia"),
});

export type AssignmentCreateData = z.infer<typeof AssignmentCreateSchema>;
export type AssignmentUpdateData = z.infer<typeof AssignmentUpdateSchema>;
