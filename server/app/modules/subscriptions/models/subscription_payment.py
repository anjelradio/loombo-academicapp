from datetime import datetime
from enum import Enum
from uuid import UUID

from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class PaymentStatus(str, Enum):
    PAID = "paid"
    FAILED = "failed"
    PENDING = "pending"


class SubscriptionPayment(UUIDBaseModel, table=True):
    __tablename__ = "subscription_payments"

    school_subscription_id: UUID = Field(foreign_key="school_subscriptions.id", index=True)
    amount: float = Field(ge=0)
    currency: str = Field(default="BOB", min_length=3, max_length=3)
    status: PaymentStatus = Field(default=PaymentStatus.PENDING)
    payment_method: str | None = Field(default=None, max_length=60)
    paid_at: datetime | None = None

    provider_invoice_id: str | None = Field(default=None, max_length=120)
    provider_payment_intent_id: str | None = Field(default=None, max_length=120)
