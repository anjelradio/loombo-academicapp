from datetime import date
from typing import Annotated
from uuid import UUID

from pydantic import StringConstraints
from sqlmodel import SQLModel


class AttendanceStatusRead(SQLModel):
    id: UUID
    name: str


class AttendanceSessionCreate(SQLModel):
    attendance_date: date
    assignment_id: UUID


class AttendanceSessionRead(SQLModel):
    id: UUID
    name: str
    attendance_date: date
    is_closed: bool
    assignment_id: UUID
    term_id: UUID
    term_name: str
    school_id: UUID


class PaginatedAttendanceSession(SQLModel):
    sessions: list[AttendanceSessionRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool


class AttendanceRecordUpsert(SQLModel):
    status_id: UUID
    observation: Annotated[str | None, StringConstraints(max_length=300)] = None


class AttendanceGradebookRowRead(SQLModel):
    student_id: UUID
    first_name: str
    last_name: str
    attendance_record_id: UUID | None
    status_id: UUID | None
    status_name: str | None
    observation: str | None
    status: str


class AttendanceFinalizeSummaryRead(SQLModel):
    created_missing: int
    total_students: int
