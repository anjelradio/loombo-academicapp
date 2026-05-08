import { z } from "zod";

import { SchoolRoleEnum, SchoolTypeEnum } from "../shared/school-enums.schema";

export const SchoolResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logo_image: z.string().nullable(),
  type: SchoolTypeEnum,
  phone: z.string(),
  role: SchoolRoleEnum.optional(),
});

export const SchoolResponseListSchema = z.array(SchoolResponseSchema);

export type SchoolResponseDto = z.infer<typeof SchoolResponseSchema>;
export type SchoolResponseListDto = z.infer<typeof SchoolResponseListSchema>;
