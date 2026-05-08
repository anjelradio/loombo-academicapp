import { z } from "zod";

import { SchoolRoleEnum } from "../../school/shared/school-enums.schema";

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

export const SchoolMemberResponseListSchema = z.object({
  users: z.array(SchoolMemberSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export type SchoolMemberResponseDto = z.infer<typeof SchoolMemberSchema>;
export type SchoolMemberResponseListDto = z.infer<
  typeof SchoolMemberResponseListSchema
>;
