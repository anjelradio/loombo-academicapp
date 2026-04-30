import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.email("Correo electrónico inválido").min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
