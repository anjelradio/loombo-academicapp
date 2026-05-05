import { z } from "zod";

export const CourseResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  school_id: z.uuid(),
  school_level_id: z.uuid(),
  level_name: z.string(),
  subject_ids: z.array(z.uuid()),
});

export const CourseListResponseSchema = z.object({
  courses: z.array(CourseResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export const CourseFormOptionsResponseSchema = z.object({
  school_levels: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
    }),
  ),
  subjects: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
    }),
  ),
});

export type CourseResponseDto = z.infer<typeof CourseResponseSchema>;
export type CourseListResponseDto = z.infer<typeof CourseListResponseSchema>;
export type CourseFormOptionsResponseDto = z.infer<typeof CourseFormOptionsResponseSchema>;
