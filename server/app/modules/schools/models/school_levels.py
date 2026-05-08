from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Level(UUIDBaseModel, table=True):
    __tablename__ = "levels"
    name: str = Field(index=True, min_length=5, max_length=15)


class SchoolLevel(UUIDBaseModel, table=True):
    __tablename__ = "school_levels"
    __table_args__ = (
        Index(
            "uq_school_level_active",
            "school_id",
            "level_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    level_id: UUID = Field(foreign_key="levels.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
