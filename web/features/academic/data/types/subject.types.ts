import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";

import type { SubjectList } from "../../domain/entities/subject";

export type SubjectListResult = ApiResult<SubjectList>;
export type SubjectActionResult = ApiActionResult;
