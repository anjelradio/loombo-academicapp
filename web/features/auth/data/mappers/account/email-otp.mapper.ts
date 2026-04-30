import type {
  RequestEmailOtpResponseDto,
  VerifyEmailOtpResponseDto,
} from "../../schemas/account";
import type {
  RequestEmailOtpInfo,
  VerifyEmailOtpInfo,
} from "../../../domain/entities/email-otp";

export function toRequestEmailOtpEntity(dto: RequestEmailOtpResponseDto): RequestEmailOtpInfo {
  return {
    message: dto.message,
    expiresInSeconds: dto.expires_in_seconds,
  };
}

export function toVerifyEmailOtpEntity(dto: VerifyEmailOtpResponseDto): VerifyEmailOtpInfo {
  return {
    message: dto.message,
    emailChangeToken: dto.email_change_token,
    expiresInSeconds: dto.expires_in_seconds,
  };
}
