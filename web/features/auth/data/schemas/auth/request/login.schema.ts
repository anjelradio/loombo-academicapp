import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Correo electrónico inválido").min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es requerida"),
});
