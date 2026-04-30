export default function LoginSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative z-10 w-full rounded-t-3xl bg-white p-7 pb-8 md:w-auto md:rounded-none md:bg-transparent md:p-8">
      <div className="w-full md:w-[480px] md:max-w-[92vw] md:rounded-2xl md:border md:border-slate-200/80 md:bg-white md:p-8 md:shadow-[0_24px_48px_-24px_rgba(10,31,61,0.35)] md:transition-all md:duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_34px_64px_-26px_rgba(10,31,61,0.3)]">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Inicia sesion para continuar con la gestion academica de tu institucion.
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}
