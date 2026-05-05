import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/features/shared/infrastructure/utils/cn";

interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
  tone?: "dark" | "light";
  titleClassName?: string;
  descriptionClassName?: string;
  withAccent?: boolean;
  returnHref?: string;
  returnLabel?: string;
}

export default function PageHeading({
  title,
  description,
  className,
  tone = "dark",
  titleClassName,
  descriptionClassName,
  withAccent = false,
  returnHref,
  returnLabel = "Volver",
}: PageHeadingProps) {
  return (
    <section className={className}>
      {returnHref ? (
        <Link
          href={returnHref}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#315a85] transition-colors hover:text-[#1E3A5F]"
        >
          <ArrowLeft className="h-4 w-4" />
          {returnLabel}
        </Link>
      ) : null}
      <h1
        className={cn(
          tone === "light"
            ? "text-2xl font-semibold tracking-tight text-[#143153] md:text-3xl"
            : "text-2xl font-semibold tracking-tight text-[#EAF2FF] md:text-3xl",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {withAccent ? (
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-[#3B82F6] to-transparent" />
      ) : null}
      {description ? (
        <p
          className={cn(
            tone === "light"
              ? "mt-2 max-w-3xl text-sm leading-relaxed text-[#46698f] md:text-base"
              : "mt-2 max-w-3xl text-sm leading-relaxed text-[#B7C7DD] md:text-base",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </section>
  );
}
