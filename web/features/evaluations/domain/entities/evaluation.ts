export type Evaluation = {
  id: string;
  name: string;
  description: string | null;
  presentationDate: string;
  termId: string;
  termName: string;
  assignmentId: string;
  evaluationTypeId: string;
  evaluationTypeName: string;
  schoolId: string;
  isClosed: boolean;
};

export type EvaluationList = {
  evaluations: Evaluation[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type EvaluationTypeOption = {
  id: string;
  name: string;
};

export type EvaluationTermOption = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type StudentTermAverageRow = {
  studentId: string;
  firstName: string;
  lastName: string;
  saberScore: number | null;
  hacerScore: number | null;
  serScore: number | null;
  autoevaluacionScore: number | null;
  finalScore: number | null;
  status: "calculado" | "sin_calcular";
};
