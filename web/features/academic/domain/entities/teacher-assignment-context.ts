import { z } from "zod";

export const TeacherAssignmentContextSubjectSchema = z.object({
  assignmentId: z.uuid(),
  subjectId: z.uuid(),
  subjectName: z.string(),
});

export const TeacherAssignmentContextCourseGroupSchema = z.object({
  courseId: z.uuid(),
  courseName: z.string(),
  subjects: z.array(TeacherAssignmentContextSubjectSchema),
});

export type TeacherAssignmentContextSubject = z.infer<typeof TeacherAssignmentContextSubjectSchema>;
export type TeacherAssignmentContextCourseGroup = z.infer<typeof TeacherAssignmentContextCourseGroupSchema>;
