import { z } from "zod";

export const InvitationRoleEnum = z.enum(["admin", "teacher"]);
export const InvitationStatusEnum = z.enum(["active", "expired"]);

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const InvitationSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  role: InvitationRoleEnum,
  createdDate: dateTimeString,
  expiresAt: dateTimeString,
  schoolId: z.uuid(),
  status: InvitationStatusEnum,
});

export type Invitation = z.infer<typeof InvitationSchema>;
