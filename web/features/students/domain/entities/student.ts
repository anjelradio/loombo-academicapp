export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  schoolId: string;
};

export type StudentList = {
  students: Student[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};
