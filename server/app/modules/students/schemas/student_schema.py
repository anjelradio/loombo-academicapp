from datetime import date
from typing import Annotated, List
from uuid import UUID

from pydantic import StringConstraints, field_validator
from sqlmodel import SQLModel


class StudentCreate(SQLModel):
    first_name: Annotated[str, StringConstraints(min_length=3, max_length=50)]
    last_name: Annotated[str, StringConstraints(min_length=3, max_length=50)]
    birth_date: date

    @field_validator("first_name", "last_name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        normalized = " ".join(value.split())
        if len(normalized) < 3 or len(normalized) > 50:
            raise ValueError("El nombre y apellido deben tener entre 3 y 50 caracteres")
        return normalized


class StudentUpdate(StudentCreate):
    pass


class StudentRead(SQLModel):
    id: UUID
    first_name: str
    last_name: str
    birth_date: date
    school_id: UUID
    model_config = {"from_attributes": True}


class PaginatedStudent(SQLModel):
    students: List[StudentRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool


class StudentEvaluationGradeUpsert(SQLModel):
    score: float
    observation: str | None = None


class StudentEvaluationGradeRowRead(SQLModel):
    student_id: UUID
    first_name: str
    last_name: str
    score: float | None
    observation: str | None
    evaluation_grade_id: UUID | None
    status: str


class EvaluationFinalizeSummaryRead(SQLModel):
    created_missing: int
    total_students: int
