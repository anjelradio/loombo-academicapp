from datetime import date
from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class AttendanceSession(UUIDBaseModel, table=True):
    __tablename__ = "attendance_sessions"
    __table_args__ = (
        Index(
            "uq_attendance_sessions_assignment_term_name_date_active",
            "assignment_id",
            "term_id",
            "name",
            "attendance_date",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    name: str = Field(index=True, min_length=3, max_length=80)
    attendance_date: date
    is_closed: bool = Field(default=False)
    assignment_id: UUID = Field(foreign_key="assignments.id", index=True)
    term_id: UUID = Field(foreign_key="terms.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
