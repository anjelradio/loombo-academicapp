import { z } from "zod";
import { AuthUserSchema } from "../../domain/entities/auth-user";

export { AuthUserSchema };

export const LoginFormSchema = z.object({
  email: z
    .email("Correo electrónico inválido")
    .min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const RegisterFormSchema = z.object({
  first_name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  email: z
    .email("Correo electrónico inválido")
    .min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const LoginResponseSchema = z.object({
  user: AuthUserSchema,
  access_token: z.string(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
export type LoginResponseData = z.infer<typeof LoginResponseSchema>;
