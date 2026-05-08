export type AttendanceStatusOption = {
  id: string;
  name: string;
};

export type AttendanceGradebookStatus = "sin_registrar" | "registrado";

export type AttendanceGradebookRow = {
  studentId: string;
  firstName: string;
  lastName: string;
  attendanceRecordId: string | null;
  statusId: string | null;
  statusName: string | null;
  observation: string | null;
  status: AttendanceGradebookStatus;
};

export type AttendanceFinalizeSummary = {
  createdMissing: number;
  totalStudents: number;
};
