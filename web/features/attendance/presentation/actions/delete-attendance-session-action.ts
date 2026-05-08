"use server";

import { attendanceSessionRepository } from "@/features/attendance/data/repositories";

export async function deleteAttendanceSession(schoolId: string, sessionId: string) {
  return attendanceSessionRepository.deleteSession(schoolId, sessionId);
}
