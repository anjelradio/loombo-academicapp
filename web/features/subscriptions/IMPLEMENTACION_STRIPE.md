# Implementacion de Suscripciones con Stripe

Este documento explica, en pasos concretos, lo que falta implementar para completar el flujo de suscripciones.

## Objetivo funcional

Permitir que un director (`owner`) pueda:

1. Ver los planes disponibles.
2. Elegir un plan de pago (Profesional o Institucional).
3. Pagar en Stripe.
4. Al confirmar el pago, actualizar el plan actual de su colegio.

Notas clave del flujo actual ya implementado:

- Al crear una escuela, **se crea por defecto una suscripcion `free`** en backend.
- Luego se redirige a `/inicio/planes?schoolId=<ID_ESCUELA>`.
- El mismo catalogo se reutiliza desde el boton **"Mejorar plan"** del sidebar.

---

## Estado actual del proyecto

## Frontend (ya disponible)

- Pagina principal de catalogo (onboarding con `schoolId` por query):
  - `web/app/(onboarding)/inicio/planes/page.tsx`
  - URL esperada: `/inicio/planes?schoolId=<ID_ESCUELA>`
- Catalogo onboarding:
  - `web/features/subscriptions/presentation/config/plan-catalog.ts`
- Boton de mejorar plan en sidebar:
  - `web/components/layout/sidebar/nav-user.tsx`
- Card de planes:
  - `web/features/subscriptions/presentation/components/SubscriptionPlanCard.tsx`
- Pagina de plan actual:
  - `web/app/[schoolId]/suscripciones/actual/page.tsx`
  - URL esperada: `/{schoolId}/suscripciones/actual`

## Backend (ya disponible)

- Modelos:
  - `Plan`
  - `SchoolSubscription`
  - `SubscriptionPayment`
- Seed de planes:
  - `Esencial (free)`, `Profesional (professional)`, `Institucional (institutional)`
- Endpoint existente:
  - `GET /api/subscriptions/schools/{school_id}/current`
- Flujo de creacion de escuela:
  - Crea suscripcion inicial `free` automaticamente.

### Ubicacion del modulo backend

- Router:
  - `server/app/modules/subscriptions/router.py`
- Service:
  - `server/app/modules/subscriptions/services/subscription_service.py`
- Repository:
  - `server/app/modules/subscriptions/repositories/subscription_repository.py`
- Modelos:
  - `server/app/modules/subscriptions/models/`

---

## Comportamiento esperado final

## Regla principal

Siempre se actualiza el plan del colegio objetivo (`schoolId`) recibido en query/string o contexto de ruta.

## Escenarios

1. **Usuario crea escuela nueva**
   - Se crea en `free`.
   - Va a catalogo de planes.
   - Si elige `free`, entra al dashboard.
   - Si elige plan de pago, va a Stripe Checkout.
   - Si Stripe confirma pago exitoso, se actualiza plan del colegio.

2. **Usuario desde dashboard hace clic en "Mejorar plan"**
   - Va al mismo catalogo con `schoolId`.
   - Elige plan.
   - Stripe confirma.
   - Se actualiza plan actual del mismo colegio.

---

## Alcance exacto para la persona que implementa

## 1) Backend (Stripe + actualizacion de plan)

Implementar endpoints en modulo `subscriptions`:

1. `POST /api/subscriptions/checkout-session`
   - Input sugerido:
     - `school_id`
     - `plan_code` (`professional` | `institutional`)
   - Valida que el usuario sea owner de ese `school_id`.
   - Crea sesion de Stripe Checkout (`mode=subscription` o equivalente configurado).
   - Devuelve `checkout_url`.

2. `POST /api/subscriptions/webhook/stripe`
   - Verifica firma del webhook Stripe.
   - Procesa eventos minimos:
     - `checkout.session.completed`
     - `invoice.paid` (opcional pero recomendado)
     - `customer.subscription.updated` (opcional recomendado)
   - Actualiza plan actual de la escuela:
     - desactivar `is_current` de suscripcion anterior
     - crear nueva `SchoolSubscription` con el nuevo `plan_id`, `is_current=true`
   - Registrar pago en `SubscriptionPayment` cuando aplique.

### Recomendaciones de backend

- Guardar en metadata de Stripe:
  - `school_id`
  - `plan_code`
  - `user_id` (opcional)
- Usar idempotencia en webhook (guardar `event_id` procesado o log equivalente).
- No confiar en redirect frontend como confirmacion de pago.
- Fuente de verdad: webhook de Stripe.

---

## 2) Frontend (catalogo y redirecciones)

### Flujo en catalogo

En `SubscriptionPlanCard`:

- Para `free`:
  - mantener redireccion directa a `/{schoolId}/inicio`.
- Para planes pagos:
  - reemplazar link placeholder por accion real:
    1. Llamar endpoint `POST /api/subscriptions/checkout-session`.
    2. Si responde `checkout_url`, hacer `window.location.href = checkout_url`.

### Pantalla de retorno

Agregar una ruta de resultado, por ejemplo:

- `GET /inicio/planes/success` o `GET /inicio/planes/resultado`

Esta vista puede mostrar:

- "Estamos validando tu pago..."
- Boton para volver al dashboard del colegio.

> Nota: aunque redirija a success/cancel, la actualizacion real la confirma webhook.

---

## 3) Configuracion Stripe requerida

## Libreria recomendada para FastAPI

FastAPI no necesita un wrapper obligatorio: se usa el SDK oficial de Python de Stripe.

- Paquete recomendado:
  - `stripe`

Instalacion sugerida:

```bash
pip install stripe
```

Luego, actualizar dependencias del backend para versionado en repo:

```bash
pip freeze > requirements.txt
```

> Si el proyecto maneja un archivo de dependencias distinto (por ejemplo `requirements-dev.txt` o `pyproject.toml`), registrar ahi la dependencia nueva en lugar de sobrescribir otro flujo del equipo.

En variables de entorno (backend):

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PROFESSIONAL` (si se usa mapeo por env)
- `STRIPE_PRICE_ID_INSTITUTIONAL`
- `APP_BASE_URL` (para success/cancel URLs)

Opcional recomendado:

- guardar `stripe_price_id` en la tabla `plans` para no hardcodear precios.

---

## 4) Mapeo entre frontend y backend

Codigos de plan que **deben coincidir exactamente**:

- `free`
- `professional`
- `institutional`

No cambiar estos codigos sin sincronizar ambos lados.

Tambien sincronizar los nombres mostrados de plan en frontend y backend:

- `Esencial` -> `free`
- `Profesional` -> `professional`
- `Institucional` -> `institutional`

---

## 5) Validaciones de negocio minimas

1. Solo `owner` puede crear checkout para un colegio.
2. `school_id` debe pertenecer al usuario owner autenticado.
3. No permitir checkout para `free`.
4. Si plan no existe o esta inactivo, responder error claro.
5. Si falla webhook, no actualizar plan.

---

## 6) Checklist de pruebas manuales

1. Crear escuela nueva -> queda en `free`.
2. Ir a `/inicio/planes?schoolId=...` -> mostrar catalogo.
3. Elegir `free` -> entra al dashboard.
4. Elegir `professional` -> redirige a Stripe Checkout.
5. Completar pago de prueba -> webhook recibido.
6. Abrir `/{schoolId}/suscripciones/actual` -> mostrar plan actualizado.
7. Sidebar "Plan actual" muestra datos coherentes.
8. Sidebar "Mejorar plan" abre catalogo con schoolId correcto.

---

## 7) Alcance sugerido para 2 dias

Dia 1:

- Endpoint `checkout-session`
- Integracion frontend para redireccionar a Stripe
- Success/cancel pages basicas

Dia 2:

- Webhook Stripe + actualizacion de plan
- Registro de pago basico
- Validaciones owner/school y pruebas end-to-end

---

## 8) Fuera de alcance por ahora

- Prorrateos complejos.
- Cambios de plan con calculo avanzado de periodos.
- Reembolsos y anulaciones completas.
- Portal completo de facturas/historial detallado (se puede agregar luego).

---

## Resumen corto

La implementacion pendiente se centra en **Stripe Checkout + webhook** para actualizar el plan del colegio objetivo (`schoolId`).
El resto de la base (catalogo, modelos, suscripcion inicial free, vista de plan actual) ya esta lista.
