import { z } from "zod";

const nameValidation = z
  .string()
  .trim()
  .min(3, "El nombre del curso debe tener al menos 3 caracteres")
  .max(50, "El nombre del curso no puede superar los 50 caracteres")
  .regex(/^[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+$/, "El nombre contiene caracteres no permitidos");

export const CourseCreateSchema = z.object({
  name: nameValidation,
  schoolLevelId: z.uuid(),
  subjectIds: z.array(z.uuid()).min(1, "Debes seleccionar al menos una materia"),
});

export const CourseUpdateSchema = CourseCreateSchema;

export type CourseCreateData = z.infer<typeof CourseCreateSchema>;
export type CourseUpdateData = z.infer<typeof CourseUpdateSchema>;
