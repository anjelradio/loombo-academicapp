from uuid import UUID

from fastapi import HTTPException
from sqlmodel import Session

from app.modules.schools.repositories import SchoolRepository, SchoolUserRepository
from app.modules.subscriptions.permissions import ensure_owner_in_school
from app.modules.subscriptions.repositories import SubscriptionRepository
from app.modules.subscriptions.schemas import CurrentSubscriptionRead


class SubscriptionService:
    def __init__(self, db: Session):
        self.db = db
        self.school = SchoolRepository(db)
        self.school_user = SchoolUserRepository(db)
        self.subscription = SubscriptionRepository(db)

    # Verifica que la escuela exista y que el usuario sea owner.
    def _ensure_school_and_permissions(self, school_id: UUID, user_id: UUID) -> None:
        school = self.school.get(school_id)
        if not school:
            raise HTTPException(status_code=404, detail="Escuela no encontrada")
        ensure_owner_in_school(self.school_user, user_id, school_id)

    # Obtiene la suscripcion actual de la escuela para mostrar plan vigente.
    def get_current_subscription(self, school_id: UUID, user_id: UUID) -> CurrentSubscriptionRead:
        self._ensure_school_and_permissions(school_id, user_id)

        row = self.subscription.get_current_subscription_with_plan(school_id)
        if not row:
            raise HTTPException(status_code=404, detail="No se encontro una suscripcion activa")

        subscription, plan = row
        return CurrentSubscriptionRead(
            school_id=school_id,
            plan_code=plan.code,
            plan_name=plan.name,
            price_amount=plan.price_amount,
            currency=plan.currency,
            billing_cycle=plan.billing_cycle,
            status=subscription.status,
            current_period_end=subscription.current_period_end,
        )
