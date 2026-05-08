"use client";

import { useState } from "react";

import type { Term } from "@/features/academic/domain/entities/term";
import AppModal from "@/features/shared/components/modals/AppModal";

import EditTermForm from "./EditTermForm";

type EditTermButtonProps = {
  schoolId: string;
  term: Term;
};

export default function EditTermButton({ schoolId, term }: EditTermButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-8 rounded-lg border border-[#c7dbf1] bg-white px-3 text-xs font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
      >
        Editar
      </button>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Editar trimestre"
        description="Actualiza el nombre y las fechas del trimestre."
        size="lg"
      >
        <EditTermForm schoolId={schoolId} term={term} onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
}
