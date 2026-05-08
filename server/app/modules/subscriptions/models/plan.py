from enum import Enum

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class BillingCycle(str, Enum):
    MONTHLY = "monthly"


class PlanCode(str, Enum):
    FREE = "free"
    PROFESSIONAL = "professional"
    INSTITUTIONAL = "institutional"


class Plan(UUIDBaseModel, table=True):
    __tablename__ = "plans"
    __table_args__ = (
        Index(
            "uq_plans_code_active",
            "code",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    code: PlanCode = Field(index=True)
    name: str = Field(min_length=3, max_length=50)
    price_amount: float = Field(ge=0)
    currency: str = Field(default="BOB", min_length=3, max_length=3)
    billing_cycle: BillingCycle = Field(default=BillingCycle.MONTHLY)
