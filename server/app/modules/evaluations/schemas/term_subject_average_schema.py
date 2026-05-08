from datetime import date
from uuid import UUID

from sqlmodel import SQLModel


class TermAverageTermOptionRead(SQLModel):
    id: UUID
    name: str
    start_date: date
    end_date: date
    is_active: bool


class StudentTermAverageRowRead(SQLModel):
    student_id: UUID
    first_name: str
    last_name: str
    saber_score: float | None
    hacer_score: float | None
    ser_score: float | None
    autoevaluacion_score: float | None
    final_score: float | None
    status: str


class CalculateTermAverageSummaryRead(SQLModel):
    processed_students: int
    assignment_id: UUID
    term_id: UUID
