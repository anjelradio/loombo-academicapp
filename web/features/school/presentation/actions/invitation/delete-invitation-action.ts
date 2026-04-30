"use server";

import { invitationRepository } from "../../../data/repositories/invitation.repository";

export async function deleteInvitation(schoolId: string, invitationId: string) {
  return invitationRepository.deleteInvitation(schoolId, invitationId);
}
