import { z } from "zod";

import {
  InviteRoleEnum,
  InviteSchema,
  InviteStatusEnum,
} from "../../domain/entities/invite";

export { InviteRoleEnum, InviteSchema, InviteStatusEnum };

export const InviteListSchema = z.array(InviteSchema);

export const InviteCreateFormSchema = z.object({
  role: InviteRoleEnum,
  expires_at: z.iso.datetime(),
});
