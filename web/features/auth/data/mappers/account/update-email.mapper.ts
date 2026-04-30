import type { UpdateEmailFormData, UpdateEmailRequestDto } from "../../schemas/account";

export function toUpdateEmailRequestDto(data: UpdateEmailFormData): UpdateEmailRequestDto {
  return {
    new_email: data.newEmail,
    email_change_token: data.emailChangeToken,
  };
}
