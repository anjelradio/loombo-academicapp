"use client";

import { useState } from "react";

import { updatePassword } from "@/features/auth/presentation/actions/account/update-password-action";
import { UpdatePasswordFormSchema } from "@/features/auth/data/schemas/account.schema";
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
import { Label } from "@/components/ui/label";

export default function UserPasswordCard() {
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
    const data = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    };

    const result = UpdatePasswordFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await updatePassword(result.data);
    if (response?.ok) {
      appToast.success("Contrasena actualizada correctamente");
      handleCloseModal();
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <>
      <Card className="border-none bg-white shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl text-[#1E3A5F]">Contrasena</CardTitle>
          <CardDescription>Actualiza la clave de acceso de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pt-2">
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="h-11 bg-[#1E3A5F] px-6 text-white hover:bg-[#152B47]"
          >
            Cambiar contrasena
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl bg-white sm:max-w-xl">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-[#1E3A5F]">
              Cambiar contrasena
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Ingresa tu contraseña actual y define una nueva contraseña segura.
            </DialogDescription>
          </DialogHeader>

          <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="currentPassword" className="text-sm text-gray-700">
                Contraseña actual
              </Label>
              <Input
                id="currentPassword"
                type="password"
                name="current_password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="h-12 border-gray-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword" className="text-sm text-gray-700">
                Nueva contraseña
              </Label>
              <Input
                id="newPassword"
                type="password"
                name="new_password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="h-12 border-gray-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmNewPassword" className="text-sm text-gray-700">
                Confirmar nueva contraseña
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                name="confirm_new_password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                className="h-12 border-gray-300"
                required
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button type="submit" className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47]">
                Guardar cambios
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
