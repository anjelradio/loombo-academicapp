import { attendanceSessionApi } from "../api/attendance-session-api";

export const attendanceSessionRepository = {
  getSessionsByAssignment(schoolId: string, assignmentId: string, page?: number, perPage?: number) {
    return attendanceSessionApi.getSessionsByAssignment(schoolId, assignmentId, page, perPage);
  },

  createSession(schoolId: string, data: unknown) {
    return attendanceSessionApi.createSession(schoolId, data);
  },

  getSessionById(schoolId: string, sessionId: string) {
    return attendanceSessionApi.getSessionById(schoolId, sessionId);
  },

  getStatusOptions(schoolId: string) {
    return attendanceSessionApi.getStatusOptions(schoolId);
  },

  getGradebookBySession(schoolId: string, sessionId: string) {
    return attendanceSessionApi.getGradebookBySession(schoolId, sessionId);
  },

  upsertRecordBySessionStudent(schoolId: string, sessionId: string, studentId: string, data: unknown) {
    return attendanceSessionApi.upsertRecordBySessionStudent(schoolId, sessionId, studentId, data);
  },

  finalizeSession(schoolId: string, sessionId: string) {
    return attendanceSessionApi.finalizeSession(schoolId, sessionId);
  },

  deleteSession(schoolId: string, sessionId: string) {
    return attendanceSessionApi.deleteSession(schoolId, sessionId);
  },
};
