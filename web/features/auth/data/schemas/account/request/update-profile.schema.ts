import { z } from "zod";
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ'\-\s]+$/;

export const UpdateUserProfileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .regex(nameRegex, "El nombre contiene caracteres no permitidos"),
  lastName: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(70, "El apellido no puede superar los 70 caracteres")
    .regex(nameRegex, "El apellido contiene caracteres no permitidos"),
});

export type UpdateUserProfileFormData = z.infer<typeof UpdateUserProfileFormSchema>;
