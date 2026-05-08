import { z } from "zod";

export const SchoolRoleEnum = z.enum(["owner", "teacher", "admin"]);
export const SchoolTypeEnum = z.enum(["public", "private", "charter"]);
