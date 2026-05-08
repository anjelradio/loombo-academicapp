import SchoolPageHeader from "@/components/layout/school/SchoolPageHeader";
import PageHeading from "@/components/shared/PageHeading";
import { subscriptionRepository } from "@/features/subscriptions/data/repositories/subscription.repository";
import { AccentCard } from "@/features/shared/components/cards/AccentCard";
import { ContentGridSurface } from "@/features/shared/components/layout/ContentGridSurface";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string | null) {
  if (!value) return "Sin fecha de corte";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha de corte";
  return new Intl.DateTimeFormat("es-BO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

export default async function CurrentSubscriptionPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const response = await subscriptionRepository.getCurrentSubscription(schoolId);

  if (!response.ok) {
    throw new Error(response.errors[0] ?? "No se pudo obtener el plan actual.");
  }

  const subscription = response.data;

  return (
    <>
      <SchoolPageHeader section="Suscripciones" page="Plan actual" />

      <ContentGridSurface variant="mist">
        <PageHeading
          title="Plan actual"
          description="Revisa la informacion activa de la suscripcion de tu institucion."
          tone="light"
          returnHref={`/${schoolId}/inicio`}
          returnLabel="Volver al inicio"
        />

        <section className="grid gap-5 lg:grid-cols-2">
          <AccentCard variant="base" eyebrow="Suscripcion" title={subscription.planName} className="p-5">
            <div className="space-y-3 rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4">
              <div className="flex items-center justify-between text-sm text-[#315a85]">
                <span className="font-medium">Plan</span>
                <span>{subscription.planName}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#315a85]">
                <span className="font-medium">Precio</span>
                <span>{formatMoney(subscription.priceAmount, subscription.currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#315a85]">
                <span className="font-medium">Ciclo</span>
                <span>{subscription.billingCycle === "monthly" ? "Mensual" : subscription.billingCycle}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#315a85]">
                <span className="font-medium">Estado</span>
                <span className="capitalize">{subscription.status.replace("_", " ")}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#315a85]">
                <span className="font-medium">Proximo corte</span>
                <span>{formatDate(subscription.currentPeriodEnd)}</span>
              </div>
            </div>
          </AccentCard>

          <AccentCard
            variant="softBlue"
            eyebrow="Siguiente paso"
            title="Gestion de suscripcion"
            description="En la siguiente etapa podras mejorar, cambiar o cancelar tu plan con integracion de pagos."
          />
        </section>
      </ContentGridSurface>
    </>
  );
}
