type HeroSectionProps = {
  urlImage: string;
  title: string;
  description: {
    mobile: string;
    desktop: string;
  };
};

export default function HeroSection({
  urlImage,
  title,
  description,
}: HeroSectionProps) {
  return (
    <section className="pointer-events-none absolute inset-0 overflow-hidden">
      <img src={urlImage} alt="Comunidad educativa" className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,31,61,0.96)_0%,rgba(18,47,88,0.9)_50%,rgba(21,68,129,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(127,176,255,0.4),transparent_32%),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px] bg-[position:0_0,0_0,0_0]" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10 lg:p-12">
        <div className="max-w-md pb-44 md:pb-8">
          <h2 className="hidden text-4xl font-semibold leading-tight text-white/95 md:block">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
            <span className="md:hidden">{description.mobile}</span>
            <span className="hidden md:inline">{description.desktop}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
