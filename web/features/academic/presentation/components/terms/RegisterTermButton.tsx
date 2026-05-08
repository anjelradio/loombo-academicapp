"use client";

import { useState } from "react";

import AppModal from "@/features/shared/components/modals/AppModal";
import PrimaryActionButton from "@/features/shared/components/ui/PrimaryActionButton";

import CreateTermForm from "./CreateTermForm";

type RegisterTermButtonProps = {
  schoolId: string;
};

export default function RegisterTermButton({ schoolId }: RegisterTermButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryActionButton className="h-10 rounded-lg px-4 text-sm" onClick={() => setOpen(true)}>
        Registrar trimestre
      </PrimaryActionButton>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Registrar trimestre"
        description="Completa el nombre y el rango de fechas del trimestre."
        size="lg"
      >
        <CreateTermForm schoolId={schoolId} onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
}
