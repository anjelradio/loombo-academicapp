import { z } from "zod";

import { SchoolRoleEnum } from "./school";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const SchoolMemberSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: SchoolRoleEnum,
  created_date: dateTimeString,
});

export type SchoolMember = z.infer<typeof SchoolMemberSchema>;
