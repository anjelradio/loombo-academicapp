export type SchoolRole = "owner" | "teacher" | "admin";
export type SchoolType = "public" | "private" | "charter";

export type School = {
  id: string;
  name: string;
  logoImage: string | null;
  type: SchoolType;
  phone: string;
  role?: SchoolRole;
};
