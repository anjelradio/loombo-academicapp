from datetime import datetime
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
