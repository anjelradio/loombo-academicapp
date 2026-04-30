import JoinSchoolCodeDialog from "@/features/school/presentation/components/school/JoinSchoolCodeDialog";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 items-center px-0 py-8 md:px-4 md:py-10 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 md:grid-cols-[40%_60%] md:gap-10">
        <section className="relative mx-4 w-[calc(100%-2rem)] max-w-2xl justify-self-center overflow-hidden rounded-3xl bg-white px-6 py-8 shadow-[0_28px_60px_-28px_rgba(10,31,61,0.55)] sm:px-8 md:mx-0 md:w-full md:max-w-none md:justify-self-auto md:px-8 md:py-8 lg:px-9 lg:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(59,130,246,0.18),transparent_36%),linear-gradient(135deg,rgba(30,58,95,0.05),transparent_55%)]" />

          <div className="relative z-10 space-y-7">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-[2.8rem]">
                Unete a tu escuela con un codigo seguro
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Accede de forma inmediata a tu entorno academico con el codigo compartido por tu
                administracion.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <JoinSchoolCodeDialog />
            </div>

            <div className="text-left">
              <Link
                href="/inicio/registrar-escuela"
                className="text-sm font-semibold text-[#1E3A5F] underline underline-offset-4 transition-colors duration-200 hover:text-[#3B82F6]"
              >
                ¿Prefieres crear tu propia institucion?
              </Link>
            </div>

            <div className="rounded-xl border border-[#1E3A5F]/12 bg-[#1E3A5F]/5 p-4">
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-[#1E3A5F]">Nota:</span> Si aun no tienes un
                codigo, solicitalo al administrador de tu institucion o al area de soporte.
              </p>
            </div>
          </div>
        </section>

        <section className="hidden md:flex md:items-center md:justify-center">
          <Image
            src="/graphics/grafico-unirse.png"
            alt="Join school illustration"
            width={760}
            height={760}
            className="h-auto w-full max-w-[760px]"
          />
        </section>
      </div>
    </div>
  );
}
