"use server";

import { inviteRepository } from "../../../data/repositories/invite.repository";

export async function createInvite(schoolId: string, data: unknown) {
  return inviteRepository.createInvite(schoolId, data);
}
