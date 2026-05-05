import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";

import type { School } from "../../domain/entities/school";
import type { SchoolMember, SchoolMemberList } from "../../domain/entities/school-member";
import type { Level } from "../../domain/entities/level";

export type SchoolListResult = ApiResult<School[]>;
export type SchoolResult = ApiResult<School>;
export type SchoolMemberListResult = ApiResult<SchoolMemberList>;
export type SchoolMemberResult = ApiResult<SchoolMember>;
export type LevelListResult = ApiResult<Level[]>;
export type SchoolActionResult = ApiActionResult;
