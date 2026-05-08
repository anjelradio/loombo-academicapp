import type { EvaluationWeightUpsertData } from "../../../schemas/evaluation-weights/request/evaluation-weight.schema";

export function toEvaluationWeightUpsertRequestDto(data: EvaluationWeightUpsertData) {
  return {
    ser: data.ser,
    saber: data.saber,
    hacer: data.hacer,
    autoevaluacion: data.autoevaluacion,
  };
}
