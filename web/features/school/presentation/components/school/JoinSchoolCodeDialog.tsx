"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { joinSchoolByCode } from "@/features/school/presentation/actions/school/join-school-action";
import { SchoolJoinByCodeSchema } from "@/features/school/data/schemas/school.schema";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import AppModal from "@/features/shared/components/modals/AppModal";

type InicioModalKey = "joinCode" | null;

export default function JoinSchoolCodeDialog() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<InicioModalKey>(null);
  const [accessCode, setAccessCode] = useState("");

  const isJoinCodeModalOpen = activeModal === "joinCode";

  const handleModalChange = (open: boolean) => {
    setActiveModal(open ? "joinCode" : null);

    if (!open) {
      setAccessCode("");
    }
  };

  const handleSubmit = async () => {
    await submitWithSchema({
      schema: SchoolJoinByCodeSchema,
      payload: {
        code: accessCode,
      },
      action: joinSchoolByCode,
      onSuccess: () => {
        setAccessCode("");
        setActiveModal(null);
        appToast.success("Te uniste correctamente a la escuela");
        router.push("/");
      },
    });
  };

  return (
    <>
      <Button
        className="h-12 w-full rounded-xl bg-[#1E3A5F] text-base font-semibold text-white shadow-[0_18px_34px_-20px_rgba(10,31,61,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#152B47] hover:shadow-[0_24px_44px_-22px_rgba(10,31,61,0.9)] sm:h-14 sm:w-auto sm:min-w-52 sm:text-lg"
        onClick={() => setActiveModal("joinCode")}
      >
        Ingresar código
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      <AppModal
        open={isJoinCodeModalOpen}
        onOpenChange={handleModalChange}
        title="Ingresa tu código de acceso"
        description="Escribe el código compartido por tu administrador para unirte a una escuela existente."
      >
          <form action={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="accessCode" className="text-gray-700 text-sm">
                Código de acceso
              </Label>
              <InputOTP
                id="accessCode"
                name="accessCode"
                maxLength={6}
                value={accessCode}
                onChange={(value) => setAccessCode(value.toUpperCase())}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12 text-base" />
                  <InputOTPSlot index={1} className="size-12 text-base" />
                  <InputOTPSlot index={2} className="size-12 text-base" />
                  <InputOTPSlot index={3} className="size-12 text-base" />
                  <InputOTPSlot index={4} className="size-12 text-base" />
                  <InputOTPSlot index={5} className="size-12 text-base" />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-gray-500">
                Si no tienes un código, solicítalo al administrador de tu
                escuela.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <ModalSecondaryButton onClick={() => setActiveModal(null)}>
                Cancelar
              </ModalSecondaryButton>
              <SubmitButton
                pendingText="Uniéndote..."
                className="h-12 bg-[#1E3A5F] hover:bg-[#152B47] text-white sm:min-w-36"
                disabled={accessCode.length !== 6}
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </SubmitButton>
            </div>
          </form>
      </AppModal>
    </>
  );
}
