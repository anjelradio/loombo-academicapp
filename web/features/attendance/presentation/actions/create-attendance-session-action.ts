"use server";

import { attendanceSessionRepository } from "@/features/attendance/data/repositories";

export async function createAttendanceSession(schoolId: string, data: unknown) {
  return attendanceSessionRepository.createSession(schoolId, data);
}
