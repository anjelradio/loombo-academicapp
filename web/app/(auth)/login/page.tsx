import HeroSection from "@/features/auth/presentation/components/auth/HeroSection";
import LoginForm from "@/features/auth/presentation/components/auth/LoginForm";
import LoginSection from "@/features/auth/presentation/components/auth/LoginSection";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <HeroSection
        urlImage="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Bienvenido nuevamente"
        description={{
          mobile: "Gestiona el progreso academico de tu institucion con informacion centralizada.",
          desktop:
            "Accede a tu entorno de gestion academica y continua el seguimiento de estudiantes, docentes y procesos clave de la institucion.",
        }}
      />
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 py-6 md:px-10 md:py-8 lg:px-12">
        <div className="flex items-center gap-3">
          <Image src="/logos/loombo-white.png" alt="LoomBo logo" width={48} height={48} priority />
          <span className="text-2xl font-semibold tracking-wide text-white md:text-4xl">LoomBo</span>
        </div>
      </header>
      <main className="relative z-10 flex min-h-screen w-full flex-col justify-end px-0 md:flex-row md:items-center md:justify-between md:px-20 lg:px-24 xl:px-32">
        <section className="px-6 pb-5 text-white md:hidden">
          <h3 className="text-2xl font-semibold leading-tight">Gestion academica con enfoque humano</h3>
        </section>
        <section className="hidden max-w-md text-white md:block md:max-w-lg md:self-center lg:max-w-xl">
          <h3 className="text-4xl font-semibold leading-tight lg:text-5xl">Gestion academica con enfoque humano</h3>
          <p className="mt-3 text-base leading-relaxed text-white/85">
            Centraliza tareas clave, organiza tu comunidad educativa y toma decisiones con claridad.
          </p>
        </section>
        <LoginSection>
          <LoginForm />
        </LoginSection>
      </main>
    </>
  );
}
