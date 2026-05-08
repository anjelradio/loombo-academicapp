import type {
  AttendanceSession,
  AttendanceSessionList,
} from "@/features/attendance/domain/entities/attendance-session";
import type {
  AttendanceSessionListResponseDto,
  AttendanceSessionResponseDto,
} from "../../../schemas/attendance-sessions/response";

export function toAttendanceSessionEntity(dto: AttendanceSessionResponseDto): AttendanceSession {
  return {
    id: dto.id,
    name: dto.name,
    attendanceDate: dto.attendance_date,
    isClosed: dto.is_closed,
    assignmentId: dto.assignment_id,
    termId: dto.term_id,
    termName: dto.term_name,
    schoolId: dto.school_id,
  };
}

export function toAttendanceSessionListEntity(dto: AttendanceSessionListResponseDto): AttendanceSessionList {
  return {
    sessions: dto.sessions.map(toAttendanceSessionEntity),
    page: dto.page,
    perPage: dto.per_page,
    totalPages: dto.total_pages,
    hasPrev: dto.has_prev,
    hasNext: dto.has_next,
  };
}
