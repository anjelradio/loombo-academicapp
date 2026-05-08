from datetime import date
from typing import Annotated
from uuid import UUID

from pydantic import StringConstraints
from sqlmodel import SQLModel


class EvaluationTypeRead(SQLModel):
    id: UUID
    name: str


class EvaluationTermOptionRead(SQLModel):
    id: UUID
    name: str
    start_date: date
    end_date: date
    is_active: bool


class EvaluationCreate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=80)]
    description: Annotated[str | None, StringConstraints(max_length=500)] = None
    presentation_date: date
    term_id: UUID
    assignment_id: UUID
    evaluation_type_id: UUID


class EvaluationUpdate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=80)]
    description: Annotated[str | None, StringConstraints(max_length=500)] = None
    presentation_date: date
    term_id: UUID
    evaluation_type_id: UUID


class EvaluationRead(SQLModel):
    id: UUID
    name: str
    description: str | None
    presentation_date: date
    term_id: UUID
    term_name: str
    assignment_id: UUID
    evaluation_type_id: UUID
    evaluation_type_name: str
    school_id: UUID
    is_closed: bool


class PaginatedEvaluation(SQLModel):
    evaluations: list[EvaluationRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool
