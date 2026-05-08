"use client";

import { useState } from "react";

import {
  UpdateEmailFormSchema,
  VerifyEmailOtpFormSchema,
} from "@/features/auth/data/schemas/account/request";
import { requestEmailOtp } from "@/features/auth/presentation/actions/account/request-email-otp-action";
import { updateEmail } from "@/features/auth/presentation/actions/account/update-email-action";
import { verifyEmailOtp } from "@/features/auth/presentation/actions/account/verify-email-otp-action";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import AppModal from "@/features/shared/components/modals/AppModal";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import {
  handleApiResultError,
} from "@/features/shared/infrastructure/errors/handle-form-errors";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

type EmailModalKey = "otp" | "newEmail" | null;

export default function ChangeEmailButton() {
  const { setUser } = useAppStore();
  const [activeModal, setActiveModal] = useState<EmailModalKey>(null);
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailChangeToken, setEmailChangeToken] = useState("");

  const isOtpModalOpen = activeModal === "otp";
  const isNewEmailModalOpen = activeModal === "newEmail";

  const resetAll = () => {
    setActiveModal(null);
    setOtp("");
    setNewEmail("");
    setEmailChangeToken("");
  };

  const handleRequestOtp = async () => {
    const response = await requestEmailOtp();
    if (!response.ok) {
      handleApiResultError(response);
      return;
    }

    appToast.success("Codigo OTP enviado a tu correo actual");
    setActiveModal("otp");
  };

  const handleVerifyOtp = async () => {
    await submitWithSchema({
      schema: VerifyEmailOtpFormSchema,
      payload: { otp },
      action: verifyEmailOtp,
      onSuccess: ({ data }) => {
        if (!data) {
          return;
        }

        setEmailChangeToken(data.emailChangeToken);
        setOtp("");
        setActiveModal("newEmail");
        appToast.success("Codigo OTP verificado correctamente");
      },
    });
  };

  const handleUpdateEmail = async () => {
    await submitWithSchema({
      schema: UpdateEmailFormSchema,
      payload: {
        newEmail,
        emailChangeToken,
      },
      action: updateEmail,
      onSuccess: ({ data }) => {
        if (!data) {
          return;
        }

        setUser(data);
        appToast.success("Correo electronico actualizado correctamente");
        resetAll();
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleRequestOtp}
        className="h-11 w-full bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:w-auto"
      >
        Cambiar correo electronico
      </Button>

      <AppModal
        open={isOtpModalOpen}
        onOpenChange={(open) => {
          if (!open) resetAll();
        }}
        title="Verificar codigo OTP"
        description="Hemos enviado un codigo OTP a tu correo actual. Ingresalo para continuar con el cambio de correo."
      >
        <form action={handleVerifyOtp} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="otpCode" className="text-sm text-gray-700">
              Codigo OTP
            </Label>
            <InputOTP
              id="otpCode"
              name="otp"
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
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
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <ModalSecondaryButton onClick={resetAll}>Cancelar</ModalSecondaryButton>
            <SubmitButton
              pendingText="Verificando..."
              className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-36"
              disabled={otp.length !== 6}
            >
              Verificar codigo
            </SubmitButton>
          </div>
        </form>
      </AppModal>

      <AppModal
        open={isNewEmailModalOpen}
        onOpenChange={(open) => {
          if (!open) resetAll();
        }}
        title="Nuevo correo electronico"
        description="Ingresa tu nuevo correo para actualizar la informacion de tu cuenta."
      >
        <form action={handleUpdateEmail} className="flex flex-col gap-6">
          <FormTextField
            id="newEmail"
            type="email"
            name="newEmail"
            label="Nuevo correo"
            placeholder="nuevo-correo@ejemplo.com"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            className="h-12 border-gray-300"
            required
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <ModalSecondaryButton onClick={resetAll}>Cancelar</ModalSecondaryButton>
            <SubmitButton
              pendingText="Guardando..."
              className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-36"
            >
              Guardar correo
            </SubmitButton>
          </div>
        </form>
      </AppModal>
    </>
  );
}
