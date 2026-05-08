import { z } from "zod";

export const SubjectResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  school_id: z.uuid(),
});

export const SubjectListResponseSchema = z.object({
  subjects: z.array(SubjectResponseSchema),
  page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  has_prev: z.boolean(),
  has_next: z.boolean(),
});

export type SubjectResponseDto = z.infer<typeof SubjectResponseSchema>;
export type SubjectListResponseDto = z.infer<typeof SubjectListResponseSchema>;
