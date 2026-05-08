from datetime import date
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Student(UUIDBaseModel, table=True):
    __tablename__ = "students"
    __table_args__ = (
        Index(
            "uq_students_school_identity_active",
            "school_id",
            "first_name",
            "last_name",
            "birth_date",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )
    first_name: str = Field(index=True, min_length=3, max_length=50)
    last_name: str = Field(index=True, min_length=3, max_length=50)
    birth_date: date
    school_id: UUID = Field(foreign_key="school.id", index=True)
