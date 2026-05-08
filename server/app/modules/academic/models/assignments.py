from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class Assignment(UUIDBaseModel, table=True):
    __tablename__ = "assignments"
    __table_args__ = (
        Index(
            "uq_assignments_teacher_course_subject_active",
            "teacher_id",
            "course_subject_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    teacher_id: UUID = Field(foreign_key="school_user.id", index=True)
    course_subject_id: UUID = Field(foreign_key="course_subjects.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
