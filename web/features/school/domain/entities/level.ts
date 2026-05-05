import { z } from "zod";

export const LevelSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export type Level = z.infer<typeof LevelSchema>;
