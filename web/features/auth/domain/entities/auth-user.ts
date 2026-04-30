import { z } from "zod";

export const AuthUserSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  isSuperAdmin: z.boolean(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
