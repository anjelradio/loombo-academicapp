"use client";

import { useState } from "react";

import { UpdatePasswordFormSchema } from "@/features/auth/data/schemas/account/request";
import { updatePassword } from "@/features/auth/presentation/actions/account/update-password-action";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import AppModal from "@/features/shared/components/modals/AppModal";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

import { Button } from "@/components/ui/button";

export default function ChangePasswordButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    await submitWithSchema({
      schema: UpdatePasswordFormSchema,
      payload: {
        currentPassword,
        newPassword,
        confirmNewPassword,
      },
      action: updatePassword,
      onSuccess: () => {
        appToast.success("Contrasena actualizada correctamente");
        handleCloseModal();
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="h-11 bg-[#1E3A5F] px-6 text-white hover:bg-[#152B47]"
      >
        Cambiar contrasena
      </Button>

      <AppModal
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
        title="Cambiar contrasena"
        description="Ingresa tu contraseña actual y define una nueva contraseña segura."
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <FormTextField
            id="currentPassword"
            type="password"
            name="currentPassword"
            label="Contraseña actual"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="h-12 border-gray-300"
            required
          />

          <FormTextField
            id="newPassword"
            type="password"
            name="newPassword"
            label="Nueva contraseña"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="h-12 border-gray-300"
            required
          />

          <FormTextField
            id="confirmNewPassword"
            type="password"
            name="confirmNewPassword"
            label="Confirmar nueva contraseña"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            className="h-12 border-gray-300"
            required
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <ModalSecondaryButton onClick={handleCloseModal}>Cancelar</ModalSecondaryButton>
            <SubmitButton
              pendingText="Guardando..."
              className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47]"
            >
              Guardar cambios
            </SubmitButton>
          </div>
        </form>
      </AppModal>
    </>
  );
}
