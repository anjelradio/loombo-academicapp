import type { Invitation } from "../../../domain/entities/invitation";
import type {
  InvitationCreateFormData,
  InvitationCreateRequestDto,
  InvitationResponseDto,
} from "../../schemas/invitation.schema";

export function toInvitationEntity(dto: InvitationResponseDto): Invitation {
  return {
    id: dto.id,
    code: dto.code,
    role: dto.role,
    createdDate: dto.created_date,
    expiresAt: dto.expires_at,
    schoolId: dto.school_id,
    status: dto.status,
  };
}

export function toInvitationEntityList(dtos: InvitationResponseDto[]): Invitation[] {
  return dtos.map(toInvitationEntity);
}

export function toInvitationCreateRequestDto(
  data: InvitationCreateFormData,
): InvitationCreateRequestDto {
  return {
    role: data.role,
    expires_at: data.expiresAt,
  };
}
