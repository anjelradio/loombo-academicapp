import type {
  TermCreateData,
  TermUpdateData,
} from "../../../schemas/terms/request/term.schema";

export function toTermCreateRequestDto(data: TermCreateData) {
  return {
    name: data.name,
    start_date: data.startDate,
    end_date: data.endDate,
  };
}

export function toTermUpdateRequestDto(data: TermUpdateData) {
  return {
    name: data.name,
    start_date: data.startDate,
    end_date: data.endDate,
  };
}
