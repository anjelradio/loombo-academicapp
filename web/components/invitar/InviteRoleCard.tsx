import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InviteRoleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export default function InviteRoleCard({
  icon,
  title,
  description,
  children,
}: InviteRoleCardProps) {
  return (
    <Card className="relative overflow-hidden border border-[#2A4369]/70 bg-gradient-to-br from-[#142845]/95 via-[#12243E]/95 to-[#0E1D34]/95 shadow-2xl">
      <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[#2AC6D1]/12" />
      <CardHeader className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1F7B8A]/45 bg-[#15344A] text-[#3FD1DB]">
          {icon}
        </div>
        <CardTitle className="text-2xl font-semibold text-[#ECF4FF]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-relaxed text-[#AFC1D8] md:text-base">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}
