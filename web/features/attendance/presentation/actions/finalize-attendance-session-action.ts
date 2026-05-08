"use server";

import { attendanceSessionRepository } from "@/features/attendance/data/repositories";

export async function finalizeAttendanceSession(schoolId: string, sessionId: string) {
  return attendanceSessionRepository.finalizeSession(schoolId, sessionId);
}
