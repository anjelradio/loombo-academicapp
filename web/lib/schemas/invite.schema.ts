import { z } from "zod";

export const InviteRoleEnum = z.enum(["admin", "teacher"]);
export const InviteStatusEnum = z.enum(["active", "expired"]);

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const InviteSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  role: InviteRoleEnum,
  created_date: dateTimeString,
  expires_at: dateTimeString,
  school_id: z.uuid(),
  status: InviteStatusEnum,
});

export const InviteListSchema = z.array(InviteSchema);

export const InviteCreateFormSchema = z.object({
  role: InviteRoleEnum,
  expires_at: z.iso.datetime(),
});
