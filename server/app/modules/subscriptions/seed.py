from sqlmodel import Session

from app.modules.subscriptions.models import BillingCycle, Plan, PlanCode
from app.modules.subscriptions.repositories import SubscriptionRepository


DEFAULT_PLANS = [
    {
        "code": PlanCode.FREE,
        "name": "Esencial",
        "price_amount": 0,
        "currency": "BOB",
        "billing_cycle": BillingCycle.MONTHLY,
    },
    {
        "code": PlanCode.PROFESSIONAL,
        "name": "Profesional",
        "price_amount": 149,
        "currency": "BOB",
        "billing_cycle": BillingCycle.MONTHLY,
    },
    {
        "code": PlanCode.INSTITUTIONAL,
        "name": "Institucional",
        "price_amount": 299,
        "currency": "BOB",
        "billing_cycle": BillingCycle.MONTHLY,
    },
]


def seed_subscription_plans(session: Session) -> None:
    repo = SubscriptionRepository(session)
    has_plans = repo.list_active_plans()
    if has_plans:
        return

    for plan_data in DEFAULT_PLANS:
        repo.create_plan(
            Plan(
                code=plan_data["code"],
                name=plan_data["name"],
                price_amount=plan_data["price_amount"],
                currency=plan_data["currency"],
                billing_cycle=plan_data["billing_cycle"],
            )
        )
    session.commit()
