"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { joinSchoolByCode } from "@/features/school/presentation/actions/school/join-school-action";
import { SchoolJoinByCodeSchema } from "@/features/school/data/schemas/school.schema";
import { appToast, showErrorList } from "@/lib/toast/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

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
    const data = {
      code: accessCode,
    };

    const result = SchoolJoinByCodeSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await joinSchoolByCode(result.data);
    if (response?.ok && response.data) {
      setAccessCode("");
      setActiveModal(null);
      appToast.success("Te uniste correctamente a la escuela");
      router.push("/");
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <>
      <Button
        className="flex-1 h-14 bg-white hover:bg-white/90 text-[#1E3A5F] text-lg font-semibold shadow-2xl transition-all cursor-pointer"
        onClick={() => setActiveModal("joinCode")}
      >
        Ingresar código
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      <Dialog open={isJoinCodeModalOpen} onOpenChange={handleModalChange}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] sm:max-w-xl bg-white p-0 rounded-2xl"
        >
          <div className="px-6 pt-7 pb-5 border-b border-gray-200">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl text-[#1E3A5F] font-bold">
                Ingresa tu código de acceso
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Escribe el código compartido por tu administrador para unirte a
                una escuela existente.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form action={handleSubmit} className="px-6 py-6 flex flex-col gap-6">
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
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setActiveModal(null)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-12 bg-[#1E3A5F] hover:bg-[#152B47] text-white sm:min-w-36"
                disabled={accessCode.length !== 6}
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
