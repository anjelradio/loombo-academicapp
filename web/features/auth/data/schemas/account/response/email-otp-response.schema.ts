import { z } from "zod";

export const RequestEmailOtpResponseSchema = z.object({
  message: z.string(),
  expires_in_seconds: z.number(),
});

export const VerifyEmailOtpResponseSchema = z.object({
  message: z.string(),
  email_change_token: z.string(),
  expires_in_seconds: z.number(),
});
