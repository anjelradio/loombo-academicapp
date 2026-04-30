import type {
  UpdatePasswordFormData,
  UpdatePasswordRequestDto,
} from "../../schemas/account";

export function toUpdatePasswordRequestDto(
  data: UpdatePasswordFormData,
): UpdatePasswordRequestDto {
  return {
    current_password: data.currentPassword,
    new_password: data.newPassword,
    confirm_new_password: data.confirmNewPassword,
  };
}
