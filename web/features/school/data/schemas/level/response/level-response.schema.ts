import { z } from "zod";

export const LevelResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const LevelResponseListSchema = z.array(LevelResponseSchema);
