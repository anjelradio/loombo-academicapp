import { ReactNode } from "react";

import { AccentCard } from "@/features/shared/components/cards/AccentCard";

interface InvitationRoleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export default function InvitationRoleCard({
  icon,
  title,
  description,
  children,
}: InvitationRoleCardProps) {
  return (
    <AccentCard
      variant="softBlue"
      title={title}
      description={description}
      className="h-full p-5"
    >
      <div className="space-y-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#bcd2ec] bg-white text-[#2d5d93]">
          <span className="text-current">{icon}</span>
        </div>
        {children}
      </div>
    </AccentCard>
  );
}
