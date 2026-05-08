import { z } from "zod";

import { SchoolTypeEnum } from "../shared/school-enums.schema";

const schoolNameRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+$/;

export { SchoolTypeEnum };

export const SchoolCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "El nombre de la escuela debe tener al menos 5 caracteres")
    .max(70, "El nombre de la escuela no puede superar los 70 caracteres")
    .regex(schoolNameRegex, "El nombre contiene caracteres no permitidos"),
  type: SchoolTypeEnum,
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?[0-9\s\-()]{8,20}$/.test(value), "El telefono es invalido"),
  levelIds: z.array(z.uuid()).min(1, "Debes seleccionar al menos un nivel"),
});

export const SchoolJoinByCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .length(6, "El codigo debe tener 6 caracteres")
    .regex(/^[A-Z0-9]+$/, "El codigo solo permite letras y numeros"),
});

export type SchoolCreateData = z.infer<typeof SchoolCreateSchema>;
export type SchoolJoinByCodeData = z.infer<typeof SchoolJoinByCodeSchema>;
