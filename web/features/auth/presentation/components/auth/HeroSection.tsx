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
    <div className="relative w-full md:w-[70%] h-80 md:h-full overflow-hidden">
      <img src={urlImage} alt="Background" className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-[#0A1F3D]/90 flex flex-col justify-between p-8 md:p-16">
        <div>
          <h1 className="text-white text-2xl md:text-4xl font-bold">AppAcademica</h1>
        </div>

        <div className="max-w-2xl pb-4 md:pb-0">
          <h2 className="hidden md:block text-white text-6xl font-bold mb-6 leading-tight">{title}</h2>

          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            <span className="md:hidden">{description.mobile}</span>
            <span className="hidden md:inline">{description.desktop}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
