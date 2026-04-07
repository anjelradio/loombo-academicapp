"use server";

import { env } from "@/lib/config/env";
import { InviteListSchema } from "@/lib/schemas/invite.schema";

import { getToken } from "./get-token";

const baseUrl = `${env.API_URL}/school`;

export async function getSchoolInvites(schoolId: string) {
  const token = await getToken();

  const res = await fetch(`${baseUrl}/${schoolId}/invite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return InviteListSchema.parse(data);
}
