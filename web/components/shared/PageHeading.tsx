interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeading({ title, description, className }: PageHeadingProps) {
  return (
    <section className={className}>
      <h1 className="text-2xl font-bold text-[#EAF2FF] md:text-3xl">{title}</h1>
      {description ? <p className="mt-2 max-w-3xl text-sm text-[#B7C7DD] md:text-base">{description}</p> : null}
    </section>
  );
}
