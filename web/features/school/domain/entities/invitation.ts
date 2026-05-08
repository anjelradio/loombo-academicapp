export type InvitationRole = "admin" | "teacher";
export type InvitationStatus = "active" | "expired";

export type Invitation = {
  id: string;
  code: string;
  role: InvitationRole;
  createdDate: string;
  expiresAt: string;
  schoolId: string;
  status: InvitationStatus;
};
