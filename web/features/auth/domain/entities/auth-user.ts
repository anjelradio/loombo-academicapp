import { z } from "zod";

export const AuthUserSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  is_super_admin: z.boolean(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
