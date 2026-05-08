import { z } from "zod";

export const SchoolMemberFilterRoleEnum = z.enum(["admin", "teacher"]);
