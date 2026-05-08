from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class EvaluationWeight(UUIDBaseModel, table=True):
    __tablename__ = "evaluation_weights"
    __table_args__ = (
        Index(
            "uq_evaluation_weights_school_level_active",
            "school_id",
            "school_level_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    ser: int = Field(ge=0, le=100)
    saber: int = Field(ge=0, le=100)
    hacer: int = Field(ge=0, le=100)
    autoevaluacion: int = Field(ge=0, le=100)
    school_id: UUID = Field(foreign_key="school.id", index=True)
    school_level_id: UUID = Field(foreign_key="school_levels.id", index=True)
