"use client";

import { useState } from "react";

import { updateProfileInfo } from "@/features/auth/presentation/actions/account/update-profile-info-action";
import { UpdateUserProfileFormSchema } from "@/features/auth/data/schemas/account.schema";
import { useAppStore } from "@/lib/store/appStore";
import { appToast, showErrorList } from "@/lib/toast/toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserInfoForm() {
  const { user, setUser } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const displayedFirstName = isEditing ? firstName : (user?.first_name ?? "");
  const displayedLastName = isEditing ? lastName : (user?.last_name ?? "");

  const handleStartEdit = () => {
    setFirstName(user?.first_name ?? "");
    setLastName(user?.last_name ?? "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(user?.first_name ?? "");
    setLastName(user?.last_name ?? "");
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    const result = UpdateUserProfileFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await updateProfileInfo(result.data);
    if (!response?.ok || !("data" in response) || !response.data) {
      showErrorList(response?.errors);
      return;
    }

    setUser(response.data);
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
    setIsEditing(false);
    appToast.success("Informacion personal actualizada");
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
            Nombre
          </Label>
          <Input
            id="firstName"
            type="text"
            name="first_name"
            value={displayedFirstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            readOnly={!isEditing}
            disabled={!isEditing}
            className="h-11 border-gray-300 bg-gray-50 disabled:opacity-100"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
            Apellidos
          </Label>
          <Input
            id="lastName"
            type="text"
            name="last_name"
            value={displayedLastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellidos"
            readOnly={!isEditing}
            disabled={!isEditing}
            className="h-11 border-gray-300 bg-gray-50 disabled:opacity-100"
            required
          />
        </div>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="h-11 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button type="submit" className="h-11 bg-[#1E3A5F] text-white hover:bg-[#152B47]">
            Guardar cambios
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={handleStartEdit}
          className="h-11 w-full bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:w-auto"
        >
          Editar
        </Button>
      )}
    </form>
  );
}
