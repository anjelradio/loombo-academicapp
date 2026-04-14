import { z } from "zod";

import { SchoolMemberSchema } from "../../domain/entities/school-member";

export { SchoolMemberSchema };
export const SchoolMemberFilterRoleEnum = z.enum(["admin", "teacher"]);
export const SchoolMemberListSchema = z.array(SchoolMemberSchema);
