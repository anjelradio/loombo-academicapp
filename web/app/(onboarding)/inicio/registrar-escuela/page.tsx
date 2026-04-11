import RegisterSchoolForm from "@/features/school/presentation/components/school/RegisterSchoolForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterSchoolPage() {
  return (
    <div className="flex-1 container mx-auto px-8 py-12 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-none">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-3xl font-bold text-center text-[#1E3A5F]">
            Registra tu institución
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-600">
            Completa los siguientes datos para crear tu colegio en la plataforma
          </CardDescription>
        </CardHeader>

        <CardContent>
            <RegisterSchoolForm/>
        </CardContent>
      </Card>
    </div>
  );
}
