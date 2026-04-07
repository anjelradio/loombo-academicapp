"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function BackToPreviousButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => router.back()}
      className="border-white/30 bg-white/15 text-white hover:border-white/40 hover:bg-white/25 hover:text-white"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver
    </Button>
  );
}
