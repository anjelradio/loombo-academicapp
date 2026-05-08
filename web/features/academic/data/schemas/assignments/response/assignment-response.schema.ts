import { z } from "zod";

export const AssignmentTeacherResponseSchema = z.object({
  teacher_id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  course_names: z.array(z.string()),
});

export const AssignmentTeacherListResponseSchema = z.object({
  teachers: z.array(AssignmentTeacherResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export const AssignmentCourseOptionResponseSchema = z.object({
  course_id: z.uuid(),
  course_name: z.string(),
});

export const AssignmentSubjectOptionResponseSchema = z.object({
  subject_id: z.uuid(),
  subject_name: z.string(),
});

export const TeacherAssignmentContextSubjectResponseSchema = z.object({
  assignment_id: z.uuid(),
  subject_id: z.uuid(),
  subject_name: z.string(),
});

export const TeacherAssignmentContextCourseGroupResponseSchema = z.object({
  course_id: z.uuid(),
  course_name: z.string(),
  subjects: z.array(TeacherAssignmentContextSubjectResponseSchema),
});

export const AssignmentSubjectResponseSchema = z.object({
  subject_id: z.uuid(),
  subject_name: z.string(),
});

export const AssignmentCourseGroupResponseSchema = z.object({
  course_id: z.uuid(),
  course_name: z.string(),
  subjects: z.array(AssignmentSubjectResponseSchema),
});

export const TeacherAssignmentsResponseSchema = z.object({
  teacher_id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  assignments: z.array(AssignmentCourseGroupResponseSchema),
});

export type AssignmentTeacherResponseDto = z.infer<typeof AssignmentTeacherResponseSchema>;
export type AssignmentTeacherListResponseDto = z.infer<typeof AssignmentTeacherListResponseSchema>;
export type AssignmentCourseOptionResponseDto = z.infer<typeof AssignmentCourseOptionResponseSchema>;
export type AssignmentSubjectOptionResponseDto = z.infer<typeof AssignmentSubjectOptionResponseSchema>;
export type TeacherAssignmentsResponseDto = z.infer<typeof TeacherAssignmentsResponseSchema>;
export type TeacherAssignmentContextCourseGroupResponseDto = z.infer<
  typeof TeacherAssignmentContextCourseGroupResponseSchema
>;
