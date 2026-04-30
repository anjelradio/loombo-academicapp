import { z } from "zod";

export const VerifyEmailOtpFormSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "El codigo OTP debe tener 6 digitos")
    .regex(/^\d+$/, "El codigo OTP solo debe contener numeros"),
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

export type VerifyEmailOtpFormData = z.infer<typeof VerifyEmailOtpFormSchema>;
export type RequestEmailOtpResponseDto = z.infer<typeof RequestEmailOtpResponseSchema>;
export type VerifyEmailOtpResponseDto = z.infer<typeof VerifyEmailOtpResponseSchema>;
