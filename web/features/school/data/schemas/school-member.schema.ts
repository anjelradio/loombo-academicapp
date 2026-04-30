import { z } from "zod";

import {
  SchoolMemberResponseListSchema,
  SchoolMemberResponseSchema,
} from "./school-member-response.schema";

export const SchoolMemberFilterRoleEnum = z.enum(["admin", "teacher"]);
export { SchoolMemberResponseSchema, SchoolMemberResponseListSchema };
