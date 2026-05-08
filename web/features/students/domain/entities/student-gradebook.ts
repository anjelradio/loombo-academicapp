export type StudentGradeStatus = "sin_calificar" | "calificado";

export type StudentGradebookRow = {
  studentId: string;
  firstName: string;
  lastName: string;
  score: number | null;
  observation: string | null;
  evaluationGradeId: string | null;
  status: StudentGradeStatus;
};

export type EvaluationFinalizeSummary = {
  createdMissing: number;
  totalStudents: number;
};
