"use server";

import { invitationRepository } from "../../../data/repositories/invitation.repository";

export async function createInvitation(schoolId: string, data: unknown) {
  return invitationRepository.createInvitation(schoolId, data);
}
