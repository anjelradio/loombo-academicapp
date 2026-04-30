import type {
  ApiActionResult,
  ApiResult,
} from "@/features/shared/infrastructure/types/api-resource";
import type { AuthUser } from "../../domain/entities/auth-user";
import type {
  RequestEmailOtpInfo,
  VerifyEmailOtpInfo,
} from "../../domain/entities/email-otp";

export type RequestEmailOtpResult = ApiResult<RequestEmailOtpInfo>;
export type VerifyEmailOtpResult = ApiResult<VerifyEmailOtpInfo>;
export type UpdateEmailResult = ApiResult<AuthUser>;
export type UpdatePasswordResult = ApiActionResult;
export type UpdateProfileInfoResult = ApiResult<AuthUser>;
