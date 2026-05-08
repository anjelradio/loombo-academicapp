from datetime import date
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Term(UUIDBaseModel, table=True):
    __tablename__ = "terms"
    __table_args__ = (
        Index(
            "uq_terms_school_name_active",
            "school_id",
            "name",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=30)
    start_date: date
    end_date: date
    school_id: UUID = Field(foreign_key="school.id", index=True)
