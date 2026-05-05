import { z } from "zod";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const SubjectSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  schoolId: z.uuid(),
});

export const SubjectListSchema = z.object({
  subjects: z.array(SubjectSchema),
  page: z.number(),
  perPage: z.number(),
  totalPages: z.number(),
  hasPrev: z.boolean(),
  hasNext: z.boolean(),
});

export const SubjectCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre de la materia debe tener al menos 3 caracteres")
    .max(70, "El nombre de la materia no puede superar los 70 caracteres")
    .regex(/^[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+$/, "El nombre contiene caracteres no permitidos"),
});

export const SubjectUpdateSchema = SubjectCreateSchema;

export type Subject = z.infer<typeof SubjectSchema>;
export type SubjectList = z.infer<typeof SubjectListSchema>;
