from datetime import datetime
from enum import Enum
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class InviteRole(str, Enum):
    ADMIN = "admin"
    TEACHER = "teacher"


class SchoolInvite(UUIDBaseModel, table=True):
    __tablename__ = "school_invite"
    __table_args__ = (
        Index(
            "uq_school_invite_code_active",
            "code",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
        Index(
            "uq_school_invite_school_role_active",
            "school_id",
            "role",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    code: str = Field(index=True)
    role: InviteRole
    expires_at: datetime
    school_id: UUID = Field(foreign_key="school.id", index=True)
