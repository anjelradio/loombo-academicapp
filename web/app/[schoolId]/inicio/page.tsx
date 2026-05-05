import PageHeading from "@/components/shared/PageHeading";
import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Users2, UserPlus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-[#2f5a86]/45 bg-[#11314f]/90 shadow-[0_24px_48px_-30px_rgba(2,10,22,0.82)]">
      <SchoolPageHeader section="Gestion del Colegio" page="Informacion" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Centro de gestion"
          description="Visualiza el estado de tu institucion y ejecuta acciones clave desde una vista clara y moderna."
          tone="light"
          titleClassName="text-3xl md:text-[2rem]"
          descriptionClassName="max-w-2xl"
        />

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <AccentCard
            eyebrow="Resumen institucional"
            title="Gestiona usuarios e invitaciones desde un solo espacio"
            description="Mantiene el control operativo de tu escuela con una experiencia ordenada y una interfaz pensada para equipos administrativos."
            className="p-6"
          >
            <div className="grid gap-3 sm:grid-cols-2">
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
          </AccentCard>

          <aside className="grid gap-4">
            <AccentCard
              eyebrow="Estado del sistema"
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Activo y estable"
              description="Tu entorno institucional se encuentra operativo."
            />

            <AccentCard
              variant="softBlue"
              eyebrow="Acciones rapidas"
              title="Ejemplo de variante Soft Blue"
              description="Esta tarjeta muestra la variante azul clara para bloques secundarios o informativos."
            >
              <div className="space-y-2">
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
            </AccentCard>
          </aside>
        </section>
      </ContentGridSurface>
    </div>
  );
}
