import { AccentCard } from "@/features/shared/components/cards/AccentCard";

type IndicatorItem = {
  label: string;
  value: number | string;
  hint?: string;
};

type IndicatorsSummaryCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: IndicatorItem[];
  className?: string;
};

export default function IndicatorsSummaryCard({
  eyebrow,
  title,
  description,
  items,
  className,
}: IndicatorsSummaryCardProps) {
  return (
    <AccentCard
      variant="softBlue"
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={className}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-[#c7dbf1] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#5f82aa]">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[#15365a]">{item.value}</p>
            {item.hint ? <p className="text-xs text-[#5f82aa]">{item.hint}</p> : null}
          </div>
        ))}
      </div>
    </AccentCard>
  );
}
