"use server";

import { invitationRepository } from "../../../data/repositories";

export async function createInvitation(schoolId: string, data: unknown) {
  return invitationRepository.createInvitation(schoolId, data);
}
