import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";

import type { School } from "../../domain/entities/school";
import type { SchoolMember } from "../../domain/entities/school-member";

export type SchoolListResult = ApiResult<School[]>;
export type SchoolResult = ApiResult<School>;
export type SchoolMemberListResult = ApiResult<SchoolMember[]>;
export type SchoolMemberResult = ApiResult<SchoolMember>;
export type SchoolActionResult = ApiActionResult;
