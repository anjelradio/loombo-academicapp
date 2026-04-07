"use server";

import { env } from "@/lib/config/env";
import { SchoolListSchema } from "../schemas/school.schema";
import { getToken } from "./get-token";

const baseUrl = `${env.API_URL}/school`;
export async function getSchoolsByUser() {
  const token = await getToken();

  const res = await fetch(`${baseUrl}/by_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return SchoolListSchema.parse(data);
}
