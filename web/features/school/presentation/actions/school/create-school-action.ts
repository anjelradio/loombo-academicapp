"use server";

import { schoolRepository } from "../../../data/repositories/school.repository";

export async function createSchool(data: unknown) {
  return schoolRepository.createSchool(data);
}
