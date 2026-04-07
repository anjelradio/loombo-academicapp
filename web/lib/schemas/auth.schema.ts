import { z } from "zod";

export const AuthUserSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  is_super_admin: z.boolean(),
});

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
