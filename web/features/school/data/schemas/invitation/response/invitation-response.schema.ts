import { z } from "zod";

import {
  InvitationRoleEnum,
  InvitationStatusEnum,
} from "../shared/invitation-enums.schema";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const InvitationResponseSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  role: InvitationRoleEnum,
  created_date: dateTimeString,
  expires_at: dateTimeString,
  school_id: z.uuid(),
  status: InvitationStatusEnum,
});

export const InvitationResponseListSchema = z.array(InvitationResponseSchema);

export type InvitationResponseDto = z.infer<typeof InvitationResponseSchema>;
export type InvitationResponseListDto = z.infer<typeof InvitationResponseListSchema>;
