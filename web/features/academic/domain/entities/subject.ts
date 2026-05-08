export type Subject = {
  id: string;
  name: string;
  schoolId: string;
};

export type SubjectList = {
  subjects: Subject[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};
