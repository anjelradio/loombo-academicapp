export type AssignmentTeacher = {
  teacherId: string;
  firstName: string;
  lastName: string;
  courseNames: string[];
};

export type AssignmentTeacherList = {
  teachers: AssignmentTeacher[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type AssignmentCourseOption = {
  courseId: string;
  courseName: string;
};

export type AssignmentSubjectOption = {
  subjectId: string;
  subjectName: string;
};

export type AssignmentSubject = {
  subjectId: string;
  subjectName: string;
};

export type AssignmentCourseGroup = {
  courseId: string;
  courseName: string;
  subjects: AssignmentSubject[];
};

export type TeacherAssignments = {
  teacherId: string;
  firstName: string;
  lastName: string;
  assignments: AssignmentCourseGroup[];
};
