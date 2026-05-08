from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class CourseStudent(UUIDBaseModel, table=True):
    __tablename__ = "course_students"
    __table_args__ = (
        Index(
            "uq_course_students_pair_active",
            "course_id",
            "student_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )
    student_id: UUID = Field(foreign_key="students.id", index=True)
    course_id: UUID = Field(foreign_key="courses.id", index=True)
