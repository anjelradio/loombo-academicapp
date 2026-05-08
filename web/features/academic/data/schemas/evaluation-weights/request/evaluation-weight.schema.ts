import { z } from "zod";

const weightValue = z.coerce
  .number()
  .int("Debe ser un numero entero")
  .min(0, "Debe estar entre 0 y 100")
  .max(100, "Debe estar entre 0 y 100");

export const EvaluationWeightUpsertSchema = z
  .object({
    ser: weightValue,
    saber: weightValue,
    hacer: weightValue,
    autoevaluacion: weightValue,
  })
  .refine((data) => data.ser + data.saber + data.hacer + data.autoevaluacion === 100, {
    path: ["autoevaluacion"],
    message: "La suma de ponderaciones debe ser 100",
  });

export type EvaluationWeightUpsertData = z.infer<typeof EvaluationWeightUpsertSchema>;
