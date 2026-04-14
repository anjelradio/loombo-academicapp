import { getToken } from "@/lib/api/get-token";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  // const cookieStore = await cookies();
  //   const token = cookieStore.get("access_token")?.value;
  // if (!token) {
  //   redirect("/login");
  // }

  // const response = await schoolRepository.getSchoolsByUser();
  // if (!response.ok || !("data" in response) || !response.data) {
  //   redirect("/inicio");
  // }

  // const schools = response.data;

  // if (schools.length === 0) {
  //   redirect("/inicio");
  // }

  // // MVP: primer colegio

  // redirect(`/${schools[0].id}/inicio`);
  return <h1>HOME</h1>;
}
