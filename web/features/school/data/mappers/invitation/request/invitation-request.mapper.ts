import type {
  InvitationCreateFormData,
  InvitationCreateRequestDto,
} from "../../../schemas/invitation/request";

export function toInvitationCreateRequestDto(
  data: InvitationCreateFormData,
): InvitationCreateRequestDto {
  return {
    role: data.role,
    expires_at: data.expiresAt,
  };
}
