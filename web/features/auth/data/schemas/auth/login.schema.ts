import { z } from "zod";

import { AuthUserResponseSchema } from "./auth-user-response.schema";

export const LoginFormSchema = z.object({
  email: z.email("Correo electrónico inválido").min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const LoginResponseSchema = z.object({
  user: AuthUserResponseSchema,
  access_token: z.string(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
