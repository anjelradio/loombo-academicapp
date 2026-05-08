from datetime import datetime
from enum import Enum
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class SubscriptionStatus(str, Enum):
    ACTIVE = "active"
    CANCELED = "canceled"
    PAST_DUE = "past_due"


class ProviderType(str, Enum):
    INTERNAL = "internal"
    STRIPE = "stripe"


class SchoolSubscription(UUIDBaseModel, table=True):
    __tablename__ = "school_subscriptions"
    __table_args__ = (
        Index(
            "uq_school_subscriptions_school_current_active",
            "school_id",
            unique=True,
            sqlite_where=text("state = 1 AND is_current = 1"),
            postgresql_where=text("state = true AND is_current = true"),
        ),
    )

    school_id: UUID = Field(foreign_key="school.id", index=True)
    plan_id: UUID = Field(foreign_key="plans.id", index=True)

    status: SubscriptionStatus = Field(default=SubscriptionStatus.ACTIVE)
    start_date: datetime = Field(default_factory=datetime.utcnow)
    end_date: datetime | None = None
    current_period_start: datetime | None = None
    current_period_end: datetime | None = None
    is_current: bool = Field(default=True)

    provider: ProviderType = Field(default=ProviderType.INTERNAL)
    provider_subscription_id: str | None = Field(default=None, max_length=120)
    provider_customer_id: str | None = Field(default=None, max_length=120)
