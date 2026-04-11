"use server";

import { schoolRepository } from "../../../data/repositories/school.repository";

export async function joinSchoolByCode(data: unknown) {
  return schoolRepository.joinSchoolByCode(data);
}
