interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
  tone?: "dark" | "light";
}

export default function PageHeading({
  title,
  description,
  className,
  tone = "dark",
}: PageHeadingProps) {
  return (
    <section className={className}>
      <h1
        className={
          tone === "light"
            ? "text-2xl font-semibold tracking-tight text-[#143153] md:text-3xl"
            : "text-2xl font-semibold tracking-tight text-[#EAF2FF] md:text-3xl"
        }
      >
        {title}
      </h1>
      {description ? (
        <p
          className={
            tone === "light"
              ? "mt-2 max-w-3xl text-sm leading-relaxed text-[#46698f] md:text-base"
              : "mt-2 max-w-3xl text-sm leading-relaxed text-[#B7C7DD] md:text-base"
          }
        >
          {description}
        </p>
      ) : null}
    </section>
  );
}
