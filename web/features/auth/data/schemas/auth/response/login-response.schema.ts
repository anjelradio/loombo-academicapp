import { z } from "zod";

import { AuthUserResponseSchema } from "./auth-user-response.schema";

export const LoginResponseSchema = z.object({
  user: AuthUserResponseSchema,
  access_token: z.string(),
});
