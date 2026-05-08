export type AttendanceSession = {
  id: string;
  name: string;
  attendanceDate: string;
  isClosed: boolean;
  assignmentId: string;
  termId: string;
  termName: string;
  schoolId: string;
};

export type AttendanceSessionList = {
  sessions: AttendanceSession[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};
