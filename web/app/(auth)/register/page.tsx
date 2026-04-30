import HeroSection from "@/features/auth/presentation/components/auth/HeroSection";
import RegisterForm from "@/features/auth/presentation/components/auth/RegisterForm";
import RegisterSection from "@/features/auth/presentation/components/auth/RegisterSection";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <>
      <HeroSection
        urlImage="https://images.unsplash.com/photo-1740635341299-3b8e3490f546?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Activa tu cuenta institucional"
        description={{
          mobile: "Crea tu cuenta y organiza la operacion academica de tu centro educativo.",
          desktop:
            "Registra tu cuenta para comenzar la administracion de procesos escolares con una experiencia moderna, confiable y orientada a resultados.",
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
          <h3 className="text-2xl font-semibold leading-tight">Da el primer paso para tu institucion</h3>
        </section>
        <RegisterSection>
          <RegisterForm />
        </RegisterSection>
        <section className="hidden max-w-md text-right text-white md:block md:max-w-lg md:self-center lg:max-w-xl">
          <h3 className="text-4xl font-semibold leading-tight lg:text-5xl">Da el primer paso para tu institucion</h3>
          <p className="mt-3 text-base leading-relaxed text-white/85">
            Crea tu cuenta y habilita una experiencia educativa moderna, ordenada y segura.
          </p>
        </section>
      </main>
    </>
  );
}
