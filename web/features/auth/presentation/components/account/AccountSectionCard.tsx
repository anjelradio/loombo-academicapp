import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/features/shared/infrastructure/utils/cn";

type AccountSectionCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  contentClassName?: string;
};

export default function AccountSectionCard({
  title,
  description,
  children,
  contentClassName,
}: AccountSectionCardProps) {
  return (
    <Card className="border-none bg-white shadow-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl text-[#1E3A5F]">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
    </Card>
  );
}
