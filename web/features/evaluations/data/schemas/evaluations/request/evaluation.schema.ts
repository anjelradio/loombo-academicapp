import { z } from "zod";

export const EvaluationCreateSchema = z.object({
  name: z.string().min(3, "El titulo debe tener al menos 3 caracteres").max(80),
  description: z.string().max(500).optional().or(z.literal("")),
  presentationDate: z.string().min(1, "Debes seleccionar una fecha"),
  termId: z.uuid("Debes seleccionar un trimestre"),
  evaluationTypeId: z.uuid("Debes seleccionar un tipo"),
  assignmentId: z.uuid(),
});

export const EvaluationUpdateSchema = z.object({
  name: z.string().min(3, "El titulo debe tener al menos 3 caracteres").max(80),
  description: z.string().max(500).optional().or(z.literal("")),
  presentationDate: z.string().min(1, "Debes seleccionar una fecha"),
  termId: z.uuid("Debes seleccionar un trimestre"),
  evaluationTypeId: z.uuid("Debes seleccionar un tipo"),
});

export type EvaluationCreateData = z.infer<typeof EvaluationCreateSchema>;
export type EvaluationUpdateData = z.infer<typeof EvaluationUpdateSchema>;
