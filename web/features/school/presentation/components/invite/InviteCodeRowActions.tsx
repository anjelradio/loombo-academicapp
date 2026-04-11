"use client";

import { useRouter } from "next/navigation";
import { CopyIcon, Trash2Icon } from "lucide-react";

import { deleteInvite } from "@/features/school/presentation/actions/invite/delete-invite-action";
import { appToast, showErrorList } from "@/lib/toast/toast";
import { Button } from "@/components/ui/button";

interface InviteCodeRowActionsProps {
  schoolId: string;
  inviteId: string;
  code: string;
}

export default function InviteCodeRowActions({
  schoolId,
  inviteId,
  code,
}: InviteCodeRowActionsProps) {
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      appToast.success("Codigo copiado al portapapeles");
    } catch {
      showErrorList(["No se pudo copiar el codigo"]);
    }
  };

  const handleDelete = async () => {
    const response = await deleteInvite(schoolId, inviteId);
    if (response?.ok) {
      appToast.success("Codigo eliminado correctamente");
      router.refresh();
    } else {
      showErrorList(response?.errors);
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
