import type {
  AttendanceFinalizeSummary,
  AttendanceGradebookRow,
  AttendanceStatusOption,
} from "@/features/attendance/domain/entities/attendance-gradebook";
import type {
  AttendanceFinalizeSummaryResponseDto,
  AttendanceGradebookRowResponseDto,
  AttendanceStatusOptionResponseDto,
} from "../../../schemas/gradebook/response";

export function toAttendanceStatusOptionEntity(
  dto: AttendanceStatusOptionResponseDto,
): AttendanceStatusOption {
  return {
    id: dto.id,
    name: dto.name,
  };
}

export function toAttendanceGradebookRowEntity(dto: AttendanceGradebookRowResponseDto): AttendanceGradebookRow {
  return {
    studentId: dto.student_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    attendanceRecordId: dto.attendance_record_id,
    statusId: dto.status_id,
    statusName: dto.status_name,
    observation: dto.observation,
    status: dto.status,
  };
}

export function toAttendanceFinalizeSummaryEntity(
  dto: AttendanceFinalizeSummaryResponseDto,
): AttendanceFinalizeSummary {
  return {
    createdMissing: dto.created_missing,
    totalStudents: dto.total_students,
  };
}
