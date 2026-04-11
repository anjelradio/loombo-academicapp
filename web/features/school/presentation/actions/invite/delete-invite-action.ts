"use server";

import { inviteRepository } from "../../../data/repositories/invite.repository";

export async function deleteInvite(schoolId: string, inviteId: string) {
  return inviteRepository.deleteInvite(schoolId, inviteId);
}
