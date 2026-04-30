"use client";

import { useRouter } from "next/navigation";
import { CopyIcon, Trash2Icon } from "lucide-react";

import { deleteInvitation } from "@/features/school/presentation/actions/invitation/delete-invitation-action";
import { appToast } from "@/features/shared/components/toast/toast";
import { handleApiResultError } from "@/features/shared/infrastructure/errors/handle-form-errors";
import { Button } from "@/components/ui/button";

interface InvitationCodeRowActionsProps {
  schoolId: string;
  invitationId: string;
  code: string;
}

export default function InvitationCodeRowActions({
  schoolId,
  invitationId,
  code,
}: InvitationCodeRowActionsProps) {
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      appToast.success("Codigo copiado al portapapeles");
    } catch {
      handleApiResultError({ errors: ["No se pudo copiar el codigo"] });
    }
  };

  const handleDelete = async () => {
    const response = await deleteInvitation(schoolId, invitationId);
    if (response.ok) {
      appToast.success("Codigo eliminado correctamente");
      router.refresh();
    } else {
      handleApiResultError(response);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-[#A9BCD8] hover:bg-[#1D324F] hover:text-[#EAF2FF]"
        onClick={handleCopy}
        aria-label={`Copiar codigo ${code}`}
      >
        <CopyIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-[#A9BCD8] hover:bg-[#3A2332] hover:text-[#FFD9E5]"
        onClick={handleDelete}
        aria-label={`Eliminar codigo ${code}`}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
