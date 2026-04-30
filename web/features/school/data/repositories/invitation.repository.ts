import { invitationApi } from "../api/invitation-api";

export const invitationRepository = {
  getSchoolInvitations(schoolId: string) {
    return invitationApi.getSchoolInvitations(schoolId);
  },

  createInvitation(schoolId: string, data: unknown) {
    return invitationApi.createInvitation(schoolId, data);
  },

  deleteInvitation(schoolId: string, invitationId: string) {
    return invitationApi.deleteInvitation(schoolId, invitationId);
  },
};
