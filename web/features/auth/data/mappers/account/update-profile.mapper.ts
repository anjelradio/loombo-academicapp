import type {
  UpdateUserProfileFormData,
  UpdateUserProfileRequestDto,
} from "../../schemas/account";

export function toUpdateUserProfileRequestDto(
  data: UpdateUserProfileFormData,
): UpdateUserProfileRequestDto {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
  };
}
