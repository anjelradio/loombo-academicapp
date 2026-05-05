import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { Wrench } from "lucide-react";

type UsersPlaceholderCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function UsersPlaceholderCard({
  eyebrow,
  title,
  description,
  className,
}: UsersPlaceholderCardProps) {
  return (
    <AccentCard
      variant="softBlue"
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={className}
    >
      <div className="flex h-full min-h-28 items-center gap-3 rounded-xl border border-[#c7dbf1] bg-white p-4 text-sm text-[#456a92]">
        <div className="rounded-lg border border-[#c7dbf1] bg-[#f3f8ff] p-2 text-[#2f5d8d]">
          <Wrench className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-[#1e456e]">Funcion en desarrollo</p>
          <p className="mt-1 text-xs text-[#5f82aa]">Modulo en construccion.</p>
        </div>
      </div>
    </AccentCard>
  );
}
