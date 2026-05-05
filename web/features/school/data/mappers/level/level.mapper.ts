import type { Level } from "@/features/school/domain/entities/level";

type LevelResponse = {
  id: string;
  name: string;
};

export function toLevelEntity(level: LevelResponse): Level {
  return {
    id: level.id,
    name: level.name,
  };
}

export function toLevelEntityList(levels: LevelResponse[]): Level[] {
  return levels.map(toLevelEntity);
}
