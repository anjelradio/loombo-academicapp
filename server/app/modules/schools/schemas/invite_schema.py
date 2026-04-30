from datetime import datetime, timezone
from enum import Enum
from uuid import UUID

from pydantic import field_validator
from sqlmodel import SQLModel

from app.modules.schools.models import InviteRole


class InviteStatus(str, Enum):
    ACTIVE = "active"
    EXPIRED = "expired"


class SchoolInviteCreate(SQLModel):
    role: InviteRole
    expires_at: datetime

    @field_validator("expires_at")
    @classmethod
    def normalize_expires_at(cls, value: datetime) -> datetime:
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc)


class SchoolInviteRead(SQLModel):
    id: UUID
    code: str
    role: InviteRole
    created_date: datetime
    expires_at: datetime
    school_id: UUID
    status: InviteStatus


class SchoolJoinByCode(SQLModel):
    code: str

    @field_validator("code")
    @classmethod
    def normalize_code(cls, value: str) -> str:
        return value.strip().upper()
