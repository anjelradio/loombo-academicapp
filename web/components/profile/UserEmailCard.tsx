"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/appStore";
import {
  requestEmailOtp,
  updateEmail,
  verifyEmailOtp,
} from "@/actions/user-actions/update-email-action";
import {
  UpdateEmailFormSchema,
  VerifyEmailOtpFormSchema,
} from "@/lib/schemas/user.schema";
import { appToast, showErrorList } from "@/lib/toast/toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

type EmailModalKey = "otp" | "newEmail" | null;

export default function UserEmailCard() {
  const { user, setUser } = useAppStore();
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
    if (response?.ok && response.data) {
      appToast.success("Codigo OTP enviado a tu correo actual");
      setActiveModal("otp");
    } else {
      showErrorList(response?.errors);
    }
  };

  const handleVerifyOtp = async () => {
    const data = { otp };

    const result = VerifyEmailOtpFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await verifyEmailOtp(result.data);
    if (response?.ok && response.data) {
      setEmailChangeToken(response.data.email_change_token);
      setOtp("");
      setActiveModal("newEmail");
      appToast.success("Codigo OTP verificado correctamente");
    } else {
      showErrorList(response?.errors);
    }
  };

  const handleUpdateEmail = async () => {
    const data = {
      new_email: newEmail,
      email_change_token: emailChangeToken,
    };

    const result = UpdateEmailFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await updateEmail(result.data);
    if (response?.ok && response.data) {
      setUser(response.data);
      appToast.success("Correo electronico actualizado correctamente");
      resetAll();
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <>
      <Card className="border-none bg-white shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl text-[#1E3A5F]">Correo electronico</CardTitle>
          <CardDescription>Este es el correo asociado a tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Correo actual
            </Label>
            <Input
              id="email"
              type="email"
              value={user?.email ?? ""}
              placeholder="correo@ejemplo.com"
              readOnly
              className="h-11 border-gray-300 bg-gray-50"
            />
          </div>
          <Button
            type="button"
            onClick={handleRequestOtp}
            className="h-11 w-full bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:w-auto"
          >
            Cambiar correo electronico
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={isOtpModalOpen}
        onOpenChange={(open) => {
          if (!open) resetAll();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] rounded-2xl bg-white p-0 sm:max-w-xl"
        >
          <div className="border-b border-gray-200 px-6 pt-7 pb-5">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-[#1E3A5F]">
                Verificar codigo OTP
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Hemos enviado un codigo OTP a tu correo actual. Ingresalo para continuar con
                el cambio de correo.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form action={handleVerifyOtp} className="flex flex-col gap-6 px-6 py-6">
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
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={resetAll}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-36"
                disabled={otp.length !== 6}
              >
                Verificar codigo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isNewEmailModalOpen}
        onOpenChange={(open) => {
          if (!open) resetAll();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] rounded-2xl bg-white p-0 sm:max-w-xl"
        >
          <div className="border-b border-gray-200 px-6 pt-7 pb-5">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-[#1E3A5F]">
                Nuevo correo electronico
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Ingresa tu nuevo correo para actualizar la informacion de tu cuenta.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form action={handleUpdateEmail} className="flex flex-col gap-6 px-6 py-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="newEmail" className="text-sm text-gray-700">
                Nuevo correo
              </Label>
              <Input
                id="newEmail"
                type="email"
                name="new_email"
                placeholder="nuevo-correo@ejemplo.com"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className="h-12 border-gray-300"
                required
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={resetAll}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-36"
              >
                Guardar correo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
