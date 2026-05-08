import type { UpdateEmailFormData } from "../../../schemas/account/request";

export function toUpdateEmailRequestDto(data: UpdateEmailFormData) {
  return {
    new_email: data.newEmail,
    email_change_token: data.emailChangeToken,
  };
}
