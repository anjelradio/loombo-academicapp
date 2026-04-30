"use client";

import type { ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type AppModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  showCloseButton?: boolean;
};

export default function AppModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  bodyClassName,
  showCloseButton = false,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn("max-w-[calc(100%-2rem)] rounded-2xl bg-white p-0 sm:max-w-xl", className)}
      >
        <div className="border-b border-gray-200 px-6 pb-5 pt-7">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-[#1E3A5F]">{title}</DialogTitle>
            {description ? (
              <DialogDescription className="text-sm text-gray-600">{description}</DialogDescription>
            ) : null}
          </DialogHeader>
        </div>
        <div className={cn("px-6 py-6", bodyClassName)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
