import { z } from "zod";

export const SubjectCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre de la materia debe tener al menos 3 caracteres")
    .max(70, "El nombre de la materia no puede superar los 70 caracteres")
    .regex(/^[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+$/, "El nombre contiene caracteres no permitidos"),
});

export const SubjectUpdateSchema = SubjectCreateSchema;

export type SubjectCreateData = z.infer<typeof SubjectCreateSchema>;
export type SubjectUpdateData = z.infer<typeof SubjectUpdateSchema>;
