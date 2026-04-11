import { z } from "zod";

export const SchoolRoleEnum = z.enum(["owner", "teacher", "admin"]);
export const SchoolTypeEnum = z.enum(["public", "private", "charter"]);

export const SchoolSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logo_image: z.string().nullable(),
  type: SchoolTypeEnum,
  phone: z.string(),
  role: SchoolRoleEnum.optional(),
});

export type School = z.infer<typeof SchoolSchema>;
