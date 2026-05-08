export type Course = {
  id: string;
  name: string;
  schoolId: string;
  schoolLevelId: string;
  levelName: string;
  subjectIds: string[];
  subjectNames: string[];
};

export type CourseList = {
  courses: Course[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type CourseFormOption = {
  id: string;
  name: string;
};

export type CourseFormOptions = {
  schoolLevels: CourseFormOption[];
  subjects: CourseFormOption[];
};
