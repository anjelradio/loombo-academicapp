"use server";

import { schoolRepository } from "../../../data/repositories";

export async function joinSchoolByCode(data: unknown) {
  return schoolRepository.joinSchoolByCode(data);
}
