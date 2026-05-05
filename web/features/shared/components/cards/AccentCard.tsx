import type { ReactNode } from "react";

import { cn } from "@/features/shared/infrastructure/utils/cn";

type AccentCardVariant = "base" | "softBlue" | "deepBlue";

type AccentCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
  variant?: AccentCardVariant;
  className?: string;
};

const variantStyles: Record<AccentCardVariant, string> = {
  base: "border-[#d8e5f5] bg-white text-[#143153] shadow-[0_22px_44px_-30px_rgba(10,31,61,0.45)]",
  softBlue:
    "border-[#cddff5] bg-[linear-gradient(160deg,#f4f9ff_0%,#edf5ff_100%)] text-[#15365a] shadow-[0_20px_42px_-30px_rgba(10,31,61,0.35)]",
  deepBlue:
    "border-[#2e5d8d] bg-[linear-gradient(165deg,#1a436d_0%,#163a5f_62%,#13314f_100%)] text-[#eef5ff] shadow-[0_24px_48px_-30px_rgba(2,10,22,0.65)]",
};

export function AccentCard({
  title,
  description,
  children,
  eyebrow,
  icon,
  variant = "base",
  className,
}: AccentCardProps) {
  const isDeep = variant === "deepBlue";

  return (
    <article className={cn("relative overflow-hidden rounded-2xl border p-5", variantStyles[variant], className)}>
      {eyebrow || icon ? (
        <div
          className={cn(
            "mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em]",
            isDeep ? "text-[#bdd4ef]" : "text-[#496f99]",
          )}
        >
          {icon}
          {eyebrow ? <p>{eyebrow}</p> : null}
        </div>
      ) : null}

      {title ? (
        <h3 className={cn("text-2xl font-semibold md:text-3xl", isDeep ? "text-[#eef5ff]" : "text-[#143153]")}>
          {title}
        </h3>
      ) : null}

      {description ? (
        <p
          className={cn(
            "text-sm leading-relaxed md:text-base",
            title ? "mt-3" : "mt-1",
            isDeep ? "text-[#d0e1f5]" : "text-[#46698f]",
          )}
        >
          {description}
        </p>
      ) : null}

      {children ? <div className={cn(title || description ? "mt-6" : "mt-2")}>{children}</div> : null}
    </article>
  );
}
