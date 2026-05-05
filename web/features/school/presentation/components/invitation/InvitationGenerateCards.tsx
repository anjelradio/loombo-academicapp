"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCapIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UsersRoundIcon,
} from "lucide-react";

import { createInvitation } from "@/features/school/presentation/actions/invitation/create-invitation-action";
import InvitationRoleCard from "@/features/school/presentation/components/invitation/InvitationRoleCard";
import { FormDateField } from "@/features/shared/components/forms/FormDateField";
import { Button } from "@/components/ui/button";
import {
  InvitationCreateFormSchema,
  InvitationRoleEnum,
} from "@/features/school/data/schemas/invitation.schema";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import {
  handleApiResultError,
} from "@/features/shared/infrastructure/errors/handle-form-errors";
import AppModal from "@/features/shared/components/modals/AppModal";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type InvitationModalRole = "admin" | "teacher" | null;

interface InvitationGenerateCardsProps {
  schoolId: string;
}

export default function InvitationGenerateCards({ schoolId }: InvitationGenerateCardsProps) {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<InvitationModalRole>(null);

  const isModalOpen = activeRole !== null;

  const closeModal = () => {
    setActiveRole(null);
  };

  const roleLabel = activeRole === "admin" ? "administrativo" : "profesor";

  const handleSubmit = async (formData: FormData) => {
    if (!activeRole) return;

    const expiresDate = formData.get("expiresDate");
    if (!expiresDate) {
      handleApiResultError({ errors: ["La fecha de expiracion es requerida"] });
      return;
    }

    const expiresAtIso = new Date(`${expiresDate}T23:59:59`).toISOString();

    await submitWithSchema({
      schema: InvitationCreateFormSchema,
      payload: {
        role: InvitationRoleEnum.parse(activeRole),
        expiresAt: expiresAtIso,
      },
      action: (data) => createInvitation(schoolId, data),
      onSuccess: () => {
        appToast.success("Codigo de invitacion generado correctamente");
        closeModal();
        router.refresh();
      },
    });
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <InvitationRoleCard
          icon={<ShieldCheckIcon className="h-6 w-6" />}
          title="Invitar Personal Administrativo"
          description="Genera codigos para secretarias, asistentes administrativos y personal operativo."
        >
          <Button
            className="h-12 w-full bg-[#1E3A5F] text-base text-[#EAF2FF] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#26456E]"
            onClick={() => setActiveRole("admin")}
          >
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Generar Codigo Admin
          </Button>
        </InvitationRoleCard>

        <InvitationRoleCard
          icon={<GraduationCapIcon className="h-6 w-6" />}
          title="Invitar Profesores"
          description="Crea enlaces de invitacion para docentes y responsables de areas academicas."
        >
          <Button
            className="h-12 w-full bg-[#3B82F6] text-base text-[#EAF2FF] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2D6FD9]"
            onClick={() => setActiveRole("teacher")}
          >
            <UsersRoundIcon className="mr-2 h-4 w-4" />
            Generar Codigo Profesor
          </Button>
        </InvitationRoleCard>
      </section>

      <AppModal
        open={isModalOpen}
        onOpenChange={(open) => !open && closeModal()}
        title={`Generar codigo para ${roleLabel}`}
        description="Selecciona la fecha de expiracion del codigo de invitacion."
      >
          <form action={handleSubmit} className="flex flex-col gap-6">
            <FormDateField id="expiresDate" name="expiresDate" label="Fecha de expiracion" required />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <ModalSecondaryButton className="bg-white hover:text-gray-800" onClick={closeModal}>
                Cancelar
              </ModalSecondaryButton>
              <SubmitButton
                pendingText="Generando..."
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-40"
              >
                Generar codigo
              </SubmitButton>
            </div>
          </form>
      </AppModal>
    </>
  );
}
