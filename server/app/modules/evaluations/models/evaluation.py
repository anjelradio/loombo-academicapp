from datetime import date
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Evaluation(UUIDBaseModel, table=True):
    __tablename__ = "evaluations"
    __table_args__ = (
        Index(
            "uq_evaluations_assignment_term_name_date_active",
            "assignment_id",
            "term_id",
            "name",
            "presentation_date",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=80)
    description: str | None = Field(default=None, max_length=500)
    presentation_date: date
    is_closed: bool = Field(default=False)

    assignment_id: UUID = Field(foreign_key="assignments.id", index=True)
    term_id: UUID = Field(foreign_key="terms.id", index=True)
    evaluation_type_id: UUID = Field(foreign_key="evaluation_types.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
