from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Course(UUIDBaseModel, table=True):
    __tablename__ = "courses"
    __table_args__ = (
        Index(
            "uq_courses_school_level_name_active",
            "school_id",
            "school_level_id",
            "name",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=50)
    school_level_id: UUID = Field(foreign_key="school_levels.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
