import { z } from "zod";

import { SchoolRoleEnum } from "./school";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const SchoolMemberSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: SchoolRoleEnum,
  createdDate: dateTimeString,
});

export const SchoolMembersListSchema = z.object({
  users: z.array(SchoolMemberSchema),
  page: z.number(),
  perPage: z.number(),
  totalPages: z.number(),
  hasPrev: z.boolean(),
  hasNext: z.boolean(),
});

export type SchoolMember = z.infer<typeof SchoolMemberSchema>;
export type SchoolMemberList = z.infer<typeof SchoolMembersListSchema>;
