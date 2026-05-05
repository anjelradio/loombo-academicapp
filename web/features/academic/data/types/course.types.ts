import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";

import type { CourseFormOptions, CourseList } from "../../domain/entities/course";

export type CourseListResult = ApiResult<CourseList>;
export type CourseFormOptionsResult = ApiResult<CourseFormOptions>;
export type CourseActionResult = ApiActionResult;
