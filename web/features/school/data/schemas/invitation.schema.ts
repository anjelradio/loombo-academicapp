import { z } from "zod";

import {
  InvitationRoleEnum,
  InvitationStatusEnum,
} from "../../domain/entities/invitation";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export { InvitationRoleEnum, InvitationStatusEnum };

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

export const InvitationCreateFormSchema = z.object({
  role: InvitationRoleEnum,
  expiresAt: z.iso.datetime(),
});

export type InvitationResponseDto = z.infer<typeof InvitationResponseSchema>;
export type InvitationCreateFormData = z.infer<typeof InvitationCreateFormSchema>;
export type InvitationCreateRequestDto = { role: z.infer<typeof InvitationRoleEnum>; expires_at: string };
