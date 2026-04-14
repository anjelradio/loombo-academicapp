"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftRightIcon, Trash2Icon } from "lucide-react";

import { deleteUserFromSchool } from "@/features/school/presentation/actions/users/delete-user-from-school-action";
import { toggleUserRoleInSchool } from "@/features/school/presentation/actions/users/toggle-user-role-in-school-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { appToast, showErrorList } from "@/lib/toast/toast";

interface SchoolUserRowActionsProps {
  schoolId: string;
  userId: string;
  role: "owner" | "admin" | "teacher";
}

export default function SchoolUserRowActions({
  schoolId,
  userId,
  role,
}: SchoolUserRowActionsProps) {
  const router = useRouter();
  const nextRoleLabel = role === "admin" ? "PROFESOR" : "ADMINISTRADOR";
  const currentRoleLabel = role === "admin" ? "ADMINISTRADOR" : "PROFESOR";

  const handleToggleRole = async () => {
    const response = await toggleUserRoleInSchool(schoolId, userId);
    if (response?.ok) {
      appToast.success("Rol actualizado correctamente");
      router.refresh();
    } else {
      showErrorList(response?.errors);
    }
  };

  const handleDelete = async () => {
    const response = await deleteUserFromSchool(schoolId, userId);
    if (response?.ok) {
      appToast.success("Usuario eliminado correctamente");
      router.refresh();
    } else {
      showErrorList(response?.errors);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-[#A9BCD8] hover:bg-[#1D324F] hover:text-[#EAF2FF]"
            aria-label="Cambiar rol"
          >
            <ArrowLeftRightIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="rounded-2xl border border-gray-200 bg-white p-0">
          <div className="border-b border-gray-200 px-6 pt-7 pb-5">
            <AlertDialogHeader className="space-y-2 !items-start !text-left">
              <AlertDialogTitle className="text-2xl font-bold text-[#1E3A5F]">
                Confirmar cambio de rol
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                Este usuario actualmente es {currentRoleLabel}. Si continuas, su rol cambiara a {nextRoleLabel}.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>

          <AlertDialogFooter className="px-6 py-5">
            <AlertDialogCancel className="h-11 border-gray-300 bg-white text-gray-700 hover:bg-white hover:text-gray-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleRole}
              className="h-11 bg-[#C62828] text-white hover:bg-[#B71C1C]"
            >
              Confirmar cambio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-[#A9BCD8] hover:bg-[#3A2332] hover:text-[#FFD9E5]"
            aria-label="Eliminar usuario"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="rounded-2xl border border-gray-200 bg-white p-0">
          <div className="border-b border-gray-200 px-6 pt-7 pb-5">
            <AlertDialogHeader className="space-y-2 !items-start !text-left">
              <AlertDialogTitle className="text-2xl font-bold text-[#1E3A5F]">
                Confirmar eliminacion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                Esta accion no se podra deshacer y removera a este usuario de la escuela.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>

          <AlertDialogFooter className="px-6 py-5">
            <AlertDialogCancel className="h-11 border-gray-300 bg-white text-gray-700 hover:bg-white hover:text-gray-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 bg-[#C62828] text-white hover:bg-[#B71C1C]"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
