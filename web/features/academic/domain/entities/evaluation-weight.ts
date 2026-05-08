export type EvaluationWeight = {
  id: string;
  schoolId: string;
  schoolLevelId: string;
  ser: number;
  saber: number;
  hacer: number;
  autoevaluacion: number;
};

export type EvaluationWeightLevel = {
  schoolLevelId: string;
  levelName: string;
  hasConfigured: boolean;
  ser?: number | null;
  saber?: number | null;
  hacer?: number | null;
  autoevaluacion?: number | null;
};
