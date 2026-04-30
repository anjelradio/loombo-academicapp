import { z } from "zod";

import { SchoolRoleEnum } from "../../domain/entities/school";

const dateTimeString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Fecha invalida");

export const SchoolMemberResponseSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: SchoolRoleEnum,
  created_date: dateTimeString,
});

export const SchoolMemberResponseListSchema = z.array(SchoolMemberResponseSchema);

export type SchoolMemberResponseDto = z.infer<typeof SchoolMemberResponseSchema>;
