import { z } from "zod";

import { AuthUserSchema } from "../../domain/entities/auth-user";

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ'\-\s]+$/;

export const UpdateUserProfileFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .regex(nameRegex, "El nombre contiene caracteres no permitidos"),
  last_name: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(70, "El apellido no puede superar los 70 caracteres")
    .regex(nameRegex, "El apellido contiene caracteres no permitidos"),
});

export const VerifyEmailOtpFormSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "El codigo OTP debe tener 6 digitos")
    .regex(/^\d+$/, "El codigo OTP solo debe contener numeros"),
});

export const UpdateEmailFormSchema = z.object({
  new_email: z.email("Correo electronico invalido").min(1, "El correo es obligatorio"),
  email_change_token: z.string().min(1, "Token de verificacion requerido"),
});

export const RequestEmailOtpResponseSchema = z.object({
  message: z.string(),
  expires_in_seconds: z.number(),
});

export const VerifyEmailOtpResponseSchema = z.object({
  message: z.string(),
  email_change_token: z.string(),
  expires_in_seconds: z.number(),
});

export const UpdateEmailResponseSchema = AuthUserSchema;

export const UpdatePasswordFormSchema = z
  .object({
    current_password: z.string().min(1, "La contraseña actual es requerida"),
    new_password: z.string().min(1, "La nueva contraseña es requerida"),
    confirm_new_password: z.string().min(1, "La confirmacion de contraseña es requerida"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "La confirmacion de contraseña no coincide",
    path: ["confirm_new_password"],
  });
