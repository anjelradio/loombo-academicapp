import JoinSchoolCodeDialog from "@/features/school/presentation/components/school/JoinSchoolCodeDialog";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 container mx-auto px-8 py-12 flex items-center">
      <div className="w-full max-w-350 mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-16 items-center">
        {/* Left side - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white leading-tight">
              ¿Quieres unirte a una escuela existente?
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Únete a tu institución educativa ingresando el código de acceso
              proporcionado por tu administrador.
            </p>
          </div>

          {/* Join Button */}
          <div className="flex gap-4">
            <JoinSchoolCodeDialog />
          </div>

          <div className="text-center">
            <Link href={"/inicio/registrar-escuela"}>
              <button className="text-white/90 hover:text-white text-base underline underline-offset-4 transition-colors">
                ¿Prefieres crear tu propia institución?
              </button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-white">Nota:</strong> Si no tienes un
              código de acceso, comunícate con el administrador de tu
              institución o con el área de soporte técnico.
            </p>
          </div>
        </div>

        {/* Right side - Graphic */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-[85%]">
            <Image
              src="/graphics/grafico-unirse.png"
              alt="Join school illustration"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
