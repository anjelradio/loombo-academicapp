import { z } from "zod";

export const UpdateEmailFormSchema = z.object({
  newEmail: z.email("Correo electronico invalido").min(1, "El correo es obligatorio"),
  emailChangeToken: z.string().min(1, "Token de verificacion requerido"),
});

export type UpdateEmailFormData = z.infer<typeof UpdateEmailFormSchema>;
