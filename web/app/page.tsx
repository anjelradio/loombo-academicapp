import { getToken } from "@/lib/api/get-token";
import { getSchoolsByUser } from "@/lib/api/school-api";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  const schools = await getSchoolsByUser();

  if (schools.length === 0) {
    redirect("/inicio");
  }

  // MVP: primer colegio
  
  redirect(`/${schools[0].id}/inicio`);
}
