import { getToken } from "@/lib/api/get-token";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  const response = await schoolRepository.getSchoolsByUser();
  if (!response.ok || !("data" in response) || !response.data) {
    redirect("/inicio");
  }

  const schools = response.data;

  if (schools.length === 0) {
    redirect("/inicio");
  }

  // MVP: primer colegio

  redirect(`/${schools[0].id}/inicio`);
  return <h1>HOME</h1>;
}
