from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class EvaluationType(UUIDBaseModel, table=True):
    __tablename__ = "evaluation_types"
    __table_args__ = (
        Index(
            "uq_evaluation_types_name_active",
            "name",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=30)
