import { z } from "zod";

const nameValidation = z
  .string()
  .trim()
  .min(3, "El nombre del curso debe tener al menos 3 caracteres")
  .max(50, "El nombre del curso no puede superar los 50 caracteres")
  .regex(/^[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+$/, "El nombre contiene caracteres no permitidos");

export const CourseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  schoolId: z.uuid(),
  schoolLevelId: z.uuid(),
  levelName: z.string(),
  subjectIds: z.array(z.uuid()),
});

export const CourseListSchema = z.object({
  courses: z.array(CourseSchema),
  page: z.number(),
  perPage: z.number(),
  totalPages: z.number(),
  hasPrev: z.boolean(),
  hasNext: z.boolean(),
});

export const CourseFormLevelOptionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const CourseFormSubjectOptionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const CourseFormOptionsSchema = z.object({
  schoolLevels: z.array(CourseFormLevelOptionSchema),
  subjects: z.array(CourseFormSubjectOptionSchema),
});

export const CourseCreateSchema = z.object({
  name: nameValidation,
  schoolLevelId: z.uuid(),
  subjectIds: z.array(z.uuid()).min(1, "Debes seleccionar al menos una materia"),
});

export const CourseUpdateSchema = CourseCreateSchema;

export type Course = z.infer<typeof CourseSchema>;
export type CourseList = z.infer<typeof CourseListSchema>;
export type CourseFormOptions = z.infer<typeof CourseFormOptionsSchema>;
