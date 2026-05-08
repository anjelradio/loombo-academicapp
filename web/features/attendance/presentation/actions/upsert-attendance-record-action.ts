"use server";

import { attendanceSessionRepository } from "@/features/attendance/data/repositories";

export async function upsertAttendanceRecord(
  schoolId: string,
  sessionId: string,
  studentId: string,
  data: unknown,
) {
  return attendanceSessionRepository.upsertRecordBySessionStudent(schoolId, sessionId, studentId, data);
}
