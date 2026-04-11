import { inviteApi } from "../api/invite-api";

export const inviteRepository = {
  getSchoolInvites(schoolId: string) {
    return inviteApi.getSchoolInvites(schoolId);
  },

  createInvite(schoolId: string, data: unknown) {
    return inviteApi.createInvite(schoolId, data);
  },

  deleteInvite(schoolId: string, inviteId: string) {
    return inviteApi.deleteInvite(schoolId, inviteId);
  },
};
