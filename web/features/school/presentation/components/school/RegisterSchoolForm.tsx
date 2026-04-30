"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { SchoolCreateSchema, SchoolTypeEnum } from "@/features/school/data/schemas/school.schema";
import { createSchool } from "@/features/school/presentation/actions/school/create-school-action";
import { FormPhoneField } from "@/features/shared/components/forms/FormPhoneField";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterSchoolForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState<"public" | "private" | "charter">("public");

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: SchoolCreateSchema,
      payload: {
        name: formData.get("schoolName"),
        type,
        phone: formData.get("phone"),
      },
      action: createSchool,
      onSuccess: () => {
        formRef.current?.reset();
        setType("public");
        appToast.success("Escuela registrada correctamente");
        router.push("/");
      },
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <FormTextField
        id="schoolName"
        type="text"
        name="schoolName"
        label="Nombre del colegio"
        labelClassName="text-base font-semibold"
        placeholder="Ej: Colegio San José"
        className="h-12 text-base border-gray-300"
        required
      />

      <div className="space-y-2">
        <Label htmlFor="schoolType" className="text-base font-semibold text-gray-700">
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
        <Label htmlFor="phone" className="text-base font-semibold text-gray-700">
          Teléfono de contacto
        </Label>
        <p className="text-sm text-gray-500">
          Proporciónanos un teléfono para mantenernos conectados
        </p>
        <FormPhoneField
          id="phone"
          name="phone"
          label=""
          wrapperClassName="gap-0"
          labelClassName="hidden"
          placeholder="Ej: +51 999 999 999"
          required
        />
      </div>

      <div className="pt-4">
        <SubmitButton
          pendingText="Registrando escuela..."
          className="w-full h-14 bg-[#1E3A5F] hover:bg-[#152B47] text-white text-lg font-semibold shadow-lg"
        >
          Registrar escuela
          <ArrowRight className="w-5 h-5 ml-2" />
        </SubmitButton>
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
