from uuid import UUID

from sqlmodel import Session, select

from app.modules.subscriptions.models import Plan, PlanCode, SchoolSubscription


class SubscriptionRepository:
    def __init__(self, db: Session):
        self.db = db

    # Busca un plan activo por su codigo.
    def get_active_plan_by_code(self, code: PlanCode) -> Plan | None:
        query = select(Plan).where(Plan.code == code, Plan.state == True)
        return self.db.exec(query).first()

    # Lista planes activos ordenados por fecha de creacion.
    def list_active_plans(self) -> list[Plan]:
        query = select(Plan).where(Plan.state == True).order_by(Plan.created_date.asc())
        return self.db.exec(query).all()

    # Persiste un plan nuevo en la sesion actual.
    def create_plan(self, plan: Plan) -> Plan:
        self.db.add(plan)
        return plan

    # Busca la suscripcion actual activa de una escuela.
    def get_current_subscription_by_school_id(self, school_id: UUID) -> SchoolSubscription | None:
        query = select(SchoolSubscription).where(
            SchoolSubscription.school_id == school_id,
            SchoolSubscription.state == True,
            SchoolSubscription.is_current == True,
        )
        return self.db.exec(query).first()

    # Desactiva la bandera current de una suscripcion activa existente.
    def deactivate_current_subscription(self, current_subscription: SchoolSubscription) -> SchoolSubscription:
        current_subscription.is_current = False
        self.db.add(current_subscription)
        return current_subscription

    # Persiste una suscripcion nueva para una escuela.
    def create_school_subscription(self, school_subscription: SchoolSubscription) -> SchoolSubscription:
        self.db.add(school_subscription)
        return school_subscription

    # Busca la suscripcion actual y su plan por escuela.
    def get_current_subscription_with_plan(self, school_id: UUID):
        query = (
            select(SchoolSubscription, Plan)
            .join(Plan, Plan.id == SchoolSubscription.plan_id)
            .where(
                SchoolSubscription.school_id == school_id,
                SchoolSubscription.state == True,
                SchoolSubscription.is_current == True,
                Plan.state == True,
            )
        )
        return self.db.exec(query).first()
