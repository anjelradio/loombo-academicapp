from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class AttendanceStatus(UUIDBaseModel, table=True):
    __tablename__ = "attendance_statuses"
    __table_args__ = (
        Index(
            "uq_attendance_statuses_name_active",
            "name",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=30)


class AttendanceRecord(UUIDBaseModel, table=True):
    __tablename__ = "attendance_records"
    __table_args__ = (
        Index(
            "uq_attendance_records_session_student_active",
            "attendance_session_id",
            "student_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    status_id: UUID = Field(foreign_key="attendance_statuses.id", index=True)
    observation: str | None = Field(default=None, max_length=300)

    attendance_session_id: UUID = Field(
        foreign_key="attendance_sessions.id", index=True
    )
    student_id: UUID = Field(foreign_key="students.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
