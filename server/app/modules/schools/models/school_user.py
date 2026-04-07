from enum import Enum
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class SchoolRole(str, Enum):
    OWNER = "owner"
    ADMIN = "admin"
    TEACHER = "teacher"


class SchoolUser(UUIDBaseModel, table=True):
    __tablename__ = "school_user"
    __table_args__ = (
        Index(
            "uq_school_user_role_active",
            "user_id",
            "school_id",
            "role",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    role: SchoolRole = Field(default=SchoolRole.TEACHER)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
