import { z } from "zod";

import { AuthUserResponseSchema } from "../auth";

export const UpdateEmailFormSchema = z.object({
  newEmail: z.email("Correo electronico invalido").min(1, "El correo es obligatorio"),
  emailChangeToken: z.string().min(1, "Token de verificacion requerido"),
});

export const UpdateEmailResponseSchema = AuthUserResponseSchema;

export type UpdateEmailFormData = z.infer<typeof UpdateEmailFormSchema>;
export type UpdateEmailRequestDto = {
  new_email: string;
  email_change_token: string;
};
export type UpdateEmailResponseDto = z.infer<typeof UpdateEmailResponseSchema>;
