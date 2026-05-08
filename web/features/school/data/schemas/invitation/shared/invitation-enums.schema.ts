import { z } from "zod";

export const InvitationRoleEnum = z.enum(["admin", "teacher"]);
export const InvitationStatusEnum = z.enum(["active", "expired"]);
