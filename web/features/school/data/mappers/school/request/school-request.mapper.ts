import type {
  SchoolCreateData,
  SchoolJoinByCodeData,
} from "../../../schemas/school/request";

export function toSchoolCreateRequestDto(data: SchoolCreateData) {
  return {
    name: data.name,
    type: data.type,
    phone: data.phone,
    level_ids: data.levelIds,
  };
}

export function toSchoolJoinByCodeRequestDto(data: SchoolJoinByCodeData) {
  return {
    code: data.code,
  };
}
