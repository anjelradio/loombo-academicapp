from enum import Enum
from typing import Optional

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class SchoolType(str, Enum):
    PRIVATE = "private"
    PUBLIC = "public"
    CHARTER = "charter"  # convenio


class School(UUIDBaseModel, table=True):
    __tablename__ = "school"
    __table_args__ = (
        Index(
            "uq_school_name_active",
            "name",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
        Index(
            "uq_school_phone_active",
            "phone",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=5, max_length=70)
    logo_image: Optional[str] = None
    type: SchoolType = Field(default=SchoolType.PUBLIC)
    phone: str
