import type { Level } from "@/features/school/domain/entities/level";
import type { z } from "zod";
import { LevelResponseSchema } from "../../../schemas/level/response";

export function toLevelEntity(level: z.infer<typeof LevelResponseSchema>): Level {
  return {
    id: level.id,
    name: level.name,
  };
}

export function toLevelEntityList(levels: z.infer<typeof LevelResponseSchema>[]): Level[] {
  return levels.map(toLevelEntity);
}
