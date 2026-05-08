import { z } from "zod";

export const RequestPasswordResetOtpFormSchema = z.object({
  email: z.email("Correo electronico invalido").min(1, "El correo es obligatorio"),
});

export const VerifyPasswordResetOtpFormSchema = z.object({
  email: z.email("Correo electronico invalido").min(1, "El correo es obligatorio"),
  otp: z
    .string()
    .trim()
    .length(6, "El codigo OTP debe tener 6 digitos")
    .regex(/^\d+$/, "El codigo OTP solo debe contener numeros"),
});
