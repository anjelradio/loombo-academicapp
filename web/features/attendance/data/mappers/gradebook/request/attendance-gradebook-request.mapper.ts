import type { AttendanceRecordUpsertData } from "../../../schemas/gradebook/request";

export function toAttendanceRecordUpsertRequestDto(data: AttendanceRecordUpsertData) {
  return {
    status_id: data.statusId,
    observation: data.observation || null,
  };
}
