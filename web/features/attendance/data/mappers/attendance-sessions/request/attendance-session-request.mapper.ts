import type { AttendanceSessionCreateData } from "../../../schemas/attendance-sessions/request";

export function toAttendanceSessionCreateRequestDto(data: AttendanceSessionCreateData) {
  return {
    attendance_date: data.attendanceDate,
    assignment_id: data.assignmentId,
  };
}
