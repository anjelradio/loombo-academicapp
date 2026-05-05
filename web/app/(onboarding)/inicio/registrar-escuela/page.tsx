import RegisterSchoolForm from "@/features/school/presentation/components/school/RegisterSchoolForm";
import { schoolRepository } from "@/features/school/data/repositories/school.repository";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RegisterSchoolPage() {
  const levelsResponse = await schoolRepository.getLevels();
  const levels = levelsResponse.ok ? levelsResponse.data : [];

  return (
    <div className="flex flex-1 items-center justify-center px-0 py-8 md:px-10 md:py-10 lg:px-14">
      <Card className="mx-4 w-[calc(100%-2rem)] max-w-3xl rounded-3xl border-none bg-white shadow-[0_28px_60px_-28px_rgba(10,31,61,0.55)] md:mx-0 md:w-full">
        <CardHeader className="space-y-3 border-b border-slate-200/80 pb-6 pt-8">
          <CardTitle className="text-center text-3xl font-semibold text-[#1E3A5F] sm:text-4xl">
            Registra tu institución
          </CardTitle>
          <CardDescription className="mx-auto max-w-xl text-center text-base leading-relaxed text-slate-600">
            Completa la informacion principal para habilitar tu institucion en la plataforma.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-6 sm:px-8 md:px-10">
          <RegisterSchoolForm levels={levels} />
        </CardContent>
      </Card>
    </div>
  );
}
