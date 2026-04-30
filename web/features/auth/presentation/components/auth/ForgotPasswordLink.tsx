"use client";

import { useState } from "react";

import {
  RequestPasswordResetOtpFormSchema,
  VerifyPasswordResetOtpFormSchema,
} from "@/features/auth/data/schemas/auth";
import { requestPasswordResetOtp } from "@/features/auth/presentation/actions/auth/request-password-reset-otp-action";
import { verifyPasswordResetOtp } from "@/features/auth/presentation/actions/auth/verify-password-reset-otp-action";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import AppModal from "@/features/shared/components/modals/AppModal";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

type ForgotPasswordStep = "email" | "otp";

export default function ForgotPasswordLink() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const resetModal = () => {
    setIsModalOpen(false);
    setStep("email");
    setOtp("");
    setEmail("");
  };

  const handleRequestOtp = async () => {
    await submitWithSchema({
      schema: RequestPasswordResetOtpFormSchema,
      payload: { email },
      action: requestPasswordResetOtp,
      onSuccess: () => {
        setStep("otp");
        appToast.success("Si el correo existe, enviamos un codigo OTP");
      },
    });
  };

  const handleVerifyOtp = async () => {
    await submitWithSchema({
      schema: VerifyPasswordResetOtpFormSchema,
      payload: { email, otp },
      action: verifyPasswordResetOtp,
      onSuccess: () => {
        appToast.success(
          "Revisa tu correo. Te enviamos una nueva contraseña temporal para iniciar sesion.",
        );
        resetModal();
      },
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="text-sm font-medium text-[#1E3A5F] transition-colors duration-200 hover:text-[#3B82F6]"
      >
        ¿Olvidaste tu contraseña?
      </button>

      <AppModal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) resetModal();
        }}
        title={step === "email" ? "Recuperar contraseña" : "Verificar codigo OTP"}
        description={
          step === "email"
            ? "Ingresa el correo de tu cuenta para enviarte un codigo OTP de recuperacion."
            : "Ingresa el codigo OTP. Si es valido, te enviaremos una nueva contraseña a tu correo."
        }
      >
        {step === "email" ? (
          <form action={handleRequestOtp} className="flex flex-col gap-6">
            <FormTextField
              id="forgotPasswordEmail"
              type="email"
              name="email"
              label="Correo de la cuenta"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 border-gray-300"
              required
            />
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <ModalSecondaryButton onClick={resetModal}>Cancelar</ModalSecondaryButton>
              <SubmitButton
                pendingText="Enviando..."
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47]"
              >
                Enviar codigo
              </SubmitButton>
            </div>
          </form>
        ) : (
          <form action={handleVerifyOtp} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="forgotPasswordOtp" className="text-sm text-gray-700">
                Codigo OTP
              </Label>
              <InputOTP
                id="forgotPasswordOtp"
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
              <ModalSecondaryButton
                onClick={() => {
                  setStep("email");
                  setOtp("");
                }}
              >
                Volver
              </ModalSecondaryButton>
              <SubmitButton
                pendingText="Verificando..."
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47]"
                disabled={otp.length !== 6}
              >
                Verificar codigo
              </SubmitButton>
            </div>
          </form>
        )}
      </AppModal>
    </>
  );
}
