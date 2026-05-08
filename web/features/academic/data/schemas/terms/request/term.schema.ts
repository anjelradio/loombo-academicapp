import { z } from "zod";

export const TermCreateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "El nombre del trimestre debe tener al menos 3 caracteres")
      .max(30, "El nombre del trimestre no puede superar los 30 caracteres"),
    startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
    endDate: z.string().min(1, "La fecha de fin es obligatoria"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    path: ["endDate"],
    message: "La fecha fin debe ser mayor que la fecha inicio",
  });

export const TermUpdateSchema = TermCreateSchema;

export type TermCreateData = z.infer<typeof TermCreateSchema>;
export type TermUpdateData = z.infer<typeof TermUpdateSchema>;
