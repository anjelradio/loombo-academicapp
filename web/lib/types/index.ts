import { z } from "zod";
import { AuthUserSchema } from "../schemas/auth.schema";
import { InviteSchema } from "../schemas/invite.schema";
import { SchoolSchema } from "../schemas/school.schema";

// AuthTypes
export type AuthUser = z.infer<typeof AuthUserSchema>;

// SchoolTypes
export type School = z.infer<typeof SchoolSchema>;

// InviteTypes
export type Invite = z.infer<typeof InviteSchema>;
