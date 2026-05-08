import type { Invitation } from "../../../../domain/entities/invitation";
import type {
  InvitationResponseDto,
  InvitationResponseListDto,
} from "../../../schemas/invitation/response";

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

export function toInvitationEntityList(dtos: InvitationResponseListDto): Invitation[] {
  return dtos.map(toInvitationEntity);
}
