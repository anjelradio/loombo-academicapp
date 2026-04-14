import { getToken } from "@/lib/api/get-token";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  
  return <h1>HOME</h1>;
}
