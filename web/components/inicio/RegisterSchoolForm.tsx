"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { SchoolCreateSchema, SchoolTypeEnum } from "@/lib/schemas/school.schema";
import { createSchool } from "@/actions/school-actions/create-school-action";
import { appToast, showErrorList } from "@/lib/toast/toast";

export default function RegisterSchoolForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<"public" | "private" | "charter">("public");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    const data = {
      name,
      type,
      phone,
    };

    const result = SchoolCreateSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await createSchool(result.data);
    if (response?.ok && response.data) {
      setName("");
      setType("public");
      setPhone("");
      appToast.success("Escuela registrada correctamente");
      router.push("/");
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="schoolName"
          className="text-base font-semibold text-gray-700"
        >
          Nombre del colegio
        </Label>
        <Input
          id="schoolName"
          type="text"
          placeholder="Ej: Colegio San José"
          className="h-12 text-base border-gray-300 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="schoolType"
          className="text-base font-semibold text-gray-700"
        >
          Tipo de colegio
        </Label>
        <Select value={type} onValueChange={(value) => setType(SchoolTypeEnum.parse(value))}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]">
            <SelectValue placeholder="Selecciona el tipo de colegio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Publico</SelectItem>
            <SelectItem value="private">Privado</SelectItem>
            <SelectItem value="charter">De convenio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="text-base font-semibold text-gray-700"
        >
          Teléfono de contacto
        </Label>
        <p className="text-sm text-gray-500">
          Proporciónanos un teléfono para mantenernos conectados
        </p>
        <Input
          id="phone"
          type="tel"
          placeholder="Ej: +51 999 999 999"
          className="h-12 text-base border-gray-300 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full h-14 bg-[#1E3A5F] hover:bg-[#152B47] text-white text-lg font-semibold shadow-lg"
        >
          Registrar escuela
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          className="text-gray-600 hover:text-[#1E3A5F] text-base underline underline-offset-4 transition-colors"
          onClick={() => router.back()}
        >
          ¿Prefieres unirte a una institución existente?
        </button>
      </div>
    </form>
  );
}
