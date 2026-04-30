import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";

import type { Invitation } from "../../domain/entities/invitation";

export type InvitationListResult = ApiResult<Invitation[]>;
export type InvitationResult = ApiResult<Invitation>;
export type InvitationActionResult = ApiActionResult;
