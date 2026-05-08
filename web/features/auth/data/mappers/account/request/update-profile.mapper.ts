import type { UpdateUserProfileFormData } from "../../../schemas/account/request";

export function toUpdateUserProfileRequestDto(
  data: UpdateUserProfileFormData,
) {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
  };
}
