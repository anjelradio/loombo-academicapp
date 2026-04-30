import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Users2, UserPlus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-[#2f5a86]/45 bg-[#11314f]/90 shadow-[0_24px_48px_-30px_rgba(2,10,22,0.82)]">
      <SchoolPageHeader section="Gestion del Colegio" page="Informacion" />

      <div className="flex flex-1 flex-col gap-6 bg-[#eef4fb] p-4 md:p-6">
        <PageHeading
          title="Centro de gestion"
          description="Visualiza el estado de tu institucion y ejecuta acciones clave desde una vista clara y moderna."
          className="rounded-2xl border border-[#d8e5f5] bg-white px-5 py-5 shadow-[0_20px_40px_-30px_rgba(10,31,61,0.45)]"
          tone="light"
        />

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="relative overflow-hidden rounded-2xl border border-[#d8e5f5] bg-white p-6 shadow-[0_22px_44px_-30px_rgba(10,31,61,0.45)]">
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[linear-gradient(rgba(30,58,95,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.12)_1px,transparent_1px)] bg-[size:14px_14px] opacity-65" />
            <p className="text-xs uppercase tracking-[0.14em] text-[#496f99]">
              Resumen institucional
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#143153] md:text-3xl">
              Gestiona usuarios e invitaciones desde un solo espacio
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#46698f] md:text-base">
              Mantiene el control operativo de tu escuela con una experiencia
              ordenada y una interfaz pensada para equipos administrativos.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="./usuarios/administradores"
                className="group rounded-xl border border-[#cfdeef] bg-[#f5f9ff] p-4 transition-colors duration-200 hover:bg-[#e9f2ff]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#143153]">
                    Administradores
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-[#2b5f97] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-xs text-[#4e7095]">
                  Gestiona personal de apoyo y coordinacion.
                </p>
              </Link>

              <Link
                href="./usuarios/profesores"
                className="group rounded-xl border border-[#cfdeef] bg-[#f5f9ff] p-4 transition-colors duration-200 hover:bg-[#e9f2ff]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#143153]">
                    Profesores
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-[#2b5f97] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-xs text-[#4e7095]">
                  Consulta docentes y estado de asignacion.
                </p>
              </Link>
            </div>
          </article>

          <aside className="grid gap-4">
            <article className="relative overflow-hidden rounded-2xl border border-[#d8e5f5] bg-white p-5 shadow-[0_22px_44px_-30px_rgba(10,31,61,0.45)]">
              <div className="pointer-events-none absolute -bottom-6 right-0 h-20 w-24 bg-[linear-gradient(rgba(30,58,95,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.12)_1px,transparent_1px)] bg-[size:12px_12px] opacity-55" />
              <div className="flex items-center gap-2 text-[#496f99]">
                <ShieldCheck className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.14em]">
                  Estado del sistema
                </p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[#143153]">
                Activo y estable
              </p>
              <p className="mt-1 text-sm text-[#4e7095]">
                Tu entorno institucional se encuentra operativo.
              </p>
            </article>

            <article className="rounded-2xl border border-[#d8e5f5] bg-white p-5 shadow-[0_22px_44px_-30px_rgba(10,31,61,0.45)]">
              <p className="text-xs uppercase tracking-[0.14em] text-[#496f99]">
                Acciones rapidas
              </p>
              <div className="mt-3 space-y-2">
                <Link
                  href="./usuarios/invitar"
                  className="flex items-center gap-2 rounded-lg border border-[#cfdeef] bg-[#f5f9ff] px-3 py-2 text-sm text-[#143153] transition-colors hover:bg-[#e9f2ff]"
                >
                  <UserPlus className="h-4 w-4" />
                  Generar invitaciones
                </Link>
                <Link
                  href="./usuarios/administradores"
                  className="flex items-center gap-2 rounded-lg border border-[#cfdeef] bg-[#f5f9ff] px-3 py-2 text-sm text-[#143153] transition-colors hover:bg-[#e9f2ff]"
                >
                  <Users2 className="h-4 w-4" />
                  Ver equipo administrativo
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </div>
  );
}
