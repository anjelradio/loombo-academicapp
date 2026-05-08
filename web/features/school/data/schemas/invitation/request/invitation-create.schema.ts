import { z } from "zod";

import { InvitationRoleEnum } from "../shared/invitation-enums.schema";

export const InvitationCreateFormSchema = z.object({
  role: InvitationRoleEnum,
  expiresAt: z.iso.datetime(),
});

export type InvitationCreateFormData = z.infer<typeof InvitationCreateFormSchema>;
export type InvitationCreateRequestDto = {
  role: z.infer<typeof InvitationRoleEnum>;
  expires_at: string;
};
