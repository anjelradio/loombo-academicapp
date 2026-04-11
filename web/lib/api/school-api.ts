"use server";

import { schoolRepository } from "@/features/school/data/repositories/school.repository";

export async function getSchoolsByUser() {
  const response = await schoolRepository.getSchoolsByUser();

  if (!response.ok || !("data" in response) || !response.data) {
    throw new Error(response.errors?.[0] ?? "No fue posible obtener las escuelas");
  }

  return response.data;
}
