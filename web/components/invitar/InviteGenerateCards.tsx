"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCapIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UsersRoundIcon,
} from "lucide-react";

import { createInvite } from "@/actions/invite-actions/create-invite-action";
import InviteRoleCard from "@/components/invitar/InviteRoleCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InviteCreateFormSchema, InviteRoleEnum } from "@/lib/schemas/invite.schema";
import { appToast, showErrorList } from "@/lib/toast/toast";

type InviteModalRole = "admin" | "teacher" | null;

interface InviteGenerateCardsProps {
  schoolId: string;
}

export default function InviteGenerateCards({ schoolId }: InviteGenerateCardsProps) {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<InviteModalRole>(null);
  const [expiresDate, setExpiresDate] = useState("");

  const isModalOpen = activeRole !== null;

  const closeModal = () => {
    setActiveRole(null);
    setExpiresDate("");
  };

  const roleLabel = activeRole === "admin" ? "administrativo" : "profesor";

  const handleSubmit = async () => {
    if (!activeRole) return;

    if (!expiresDate) {
      showErrorList(["La fecha de expiracion es requerida"]);
      return;
    }

    const expiresAtIso = new Date(`${expiresDate}T23:59:59`).toISOString();

    const data = {
      role: InviteRoleEnum.parse(activeRole),
      expires_at: expiresAtIso,
    };

    const result = InviteCreateFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await createInvite(schoolId, result.data);
    if (response?.ok) {
      appToast.success("Codigo de invitacion generado correctamente");
      closeModal();
      router.refresh();
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <InviteRoleCard
          icon={<ShieldCheckIcon className="h-6 w-6" />}
          title="Invitar Personal Administrativo"
          description="Genera codigos para secretarias, asistentes administrativos y personal operativo."
        >
          <Button
            className="h-12 w-full bg-[#1D3556] text-base text-[#EAF2FF] hover:bg-[#26456E]"
            onClick={() => setActiveRole("admin")}
          >
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Generar Codigo Admin
          </Button>
        </InviteRoleCard>

        <InviteRoleCard
          icon={<GraduationCapIcon className="h-6 w-6" />}
          title="Invitar Profesores"
          description="Crea enlaces de invitacion para docentes y responsables de areas academicas."
        >
          <Button
            className="h-12 w-full bg-[#2ECBD4] text-base text-[#05313A] hover:bg-[#43D7DF]"
            onClick={() => setActiveRole("teacher")}
          >
            <UsersRoundIcon className="mr-2 h-4 w-4" />
            Generar Codigo Profesor
          </Button>
        </InviteRoleCard>
      </section>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] rounded-2xl bg-white p-0 sm:max-w-xl"
        >
          <div className="border-b border-gray-200 px-6 pt-7 pb-5">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-[#1E3A5F]">
                Generar codigo para {roleLabel}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Selecciona la fecha de expiracion del codigo de invitacion.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form action={handleSubmit} className="flex flex-col gap-6 px-6 py-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="expiresDate" className="text-sm text-gray-700">
                Fecha de expiracion
              </Label>
              <Input
                id="expiresDate"
                type="date"
                value={expiresDate}
                onChange={(event) => setExpiresDate(event.target.value)}
                className="h-12 border-gray-300 bg-white text-gray-900 [color-scheme:light]"
                required
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-12 bg-[#1E3A5F] text-white hover:bg-[#152B47] sm:min-w-40"
              >
                Generar codigo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
