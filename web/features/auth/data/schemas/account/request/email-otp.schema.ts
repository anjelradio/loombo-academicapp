import { z } from "zod";

export const VerifyEmailOtpFormSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "El codigo OTP debe tener 6 digitos")
    .regex(/^\d+$/, "El codigo OTP solo debe contener numeros"),
});
