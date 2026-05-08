from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class CourseSubject(UUIDBaseModel, table=True):
    __tablename__ = "course_subjects"
    __table_args__ = (
        Index(
            "uq_course_subjects_pair_active",
            "course_id",
            "subject_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    course_id: UUID = Field(foreign_key="courses.id", index=True)
    subject_id: UUID = Field(foreign_key="subjects.id", index=True)
