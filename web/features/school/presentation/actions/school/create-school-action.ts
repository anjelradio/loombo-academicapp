"use server";

import { schoolRepository } from "../../../data/repositories";

export async function createSchool(data: unknown) {
  return schoolRepository.createSchool(data);
}
