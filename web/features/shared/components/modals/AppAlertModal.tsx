"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AppAlertModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  actionVariant?: "default" | "destructive";
  onAction: () => void;
  actionDisabled?: boolean;
};

export default function AppAlertModal({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancelar",
  actionText = "Confirmar",
  actionVariant = "destructive",
  onAction,
  actionDisabled = false,
}: AppAlertModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#1E3A5F]">{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription className="text-sm text-gray-600">{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-11 !border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-100 hover:!text-gray-900">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={actionVariant}
            className="h-11 !bg-[#b42318] !text-white hover:!bg-[#912018]"
            onClick={onAction}
            disabled={actionDisabled}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
