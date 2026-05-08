import { z } from "zod";

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z.string().min(1, "La nueva contraseña es requerida"),
    confirmNewPassword: z.string().min(1, "La confirmacion de contraseña es requerida"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "La confirmacion de contraseña no coincide",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof UpdatePasswordFormSchema>;
