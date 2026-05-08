import type { SchoolRole } from "./school";

export type SchoolMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: SchoolRole;
  createdDate: string;
};

export type SchoolMemberList = {
  users: SchoolMember[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};
