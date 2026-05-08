import type { UpdatePasswordFormData } from "../../../schemas/account/request";

export function toUpdatePasswordRequestDto(
  data: UpdatePasswordFormData,
) {
  return {
    current_password: data.currentPassword,
    new_password: data.newPassword,
    confirm_new_password: data.confirmNewPassword,
  };
}
