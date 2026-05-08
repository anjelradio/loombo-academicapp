"use client";

import { useRef, useState } from "react";

import { updateProfileInfo } from "@/features/auth/presentation/actions/account/update-profile-info-action";
import { UpdateUserProfileFormSchema } from "@/features/auth/data/schemas/account/request";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import { appToast } from "@/features/shared/components/toast/toast";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SecondaryButton } from "@/features/shared/components/forms/SecondaryButton";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { Button } from "@/components/ui/button";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

export default function UserInfoForm() {
  const { user, setUser } = useAppStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: UpdateUserProfileFormSchema,
      payload: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      },
      action: updateProfileInfo,
      onSuccess: ({ data }) => {
        if (!data) return;
        setUser(data);
        formRef.current?.reset();
        setIsEditing(false);
        appToast.success("Informacion personal actualizada");
      },
    });
  };

  return (
    <form
      ref={formRef}
      key={`${user?.id ?? "user"}-${user?.firstName ?? ""}-${user?.lastName ?? ""}`}
      action={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FormTextField
            id="firstName"
            type="text"
            name="firstName"
            label="Nombre"
            labelClassName="text-sm font-semibold"
            defaultValue={user?.firstName ?? ""}
            placeholder="Nombre"
            readOnly={!isEditing}
            disabled={!isEditing}
            className="h-11 border-gray-300 bg-gray-50 disabled:opacity-100"
            required
          />
        </div>
        <div className="space-y-2">
          <FormTextField
            id="lastName"
            type="text"
            name="lastName"
            label="Apellidos"
            labelClassName="text-sm font-semibold"
            defaultValue={user?.lastName ?? ""}
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
          <SecondaryButton
            onClick={() => {
              formRef.current?.reset();
              setIsEditing(false);
            }}
          >
            Cancelar
          </SecondaryButton>
          <SubmitButton
            pendingText="Guardando..."
            className="h-11 bg-[#1E3A5F] text-white hover:bg-[#152B47]"
          >
            Guardar cambios
          </SubmitButton>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => setIsEditing(true)}
          className="h-11 w-full bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:w-auto"
        >
          Editar
        </Button>
      )}
    </form>
  );
}
