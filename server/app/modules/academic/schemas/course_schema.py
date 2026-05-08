import re
from typing import Annotated, List
from uuid import UUID

from pydantic import StringConstraints, field_validator
from sqlmodel import SQLModel


class CourseCreate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=50)]
    school_level_id: UUID
    subject_ids: List[UUID]

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        normalized_name = " ".join(value.split())

        if len(normalized_name) < 3 or len(normalized_name) > 50:
            raise ValueError("El nombre del curso debe tener entre 3 y 50 caracteres")

        if not re.fullmatch(r"[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+", normalized_name):
            raise ValueError("El nombre contiene caracteres no permitidos")

        return normalized_name

    @field_validator("subject_ids")
    @classmethod
    def validate_subject_ids(cls, value: List[UUID]) -> List[UUID]:
        unique_subject_ids = list(dict.fromkeys(value))
        if len(unique_subject_ids) == 0:
            raise ValueError("Debes seleccionar al menos una materia")
        return unique_subject_ids


class CourseUpdate(CourseCreate):
    pass


class CourseRead(SQLModel):
    id: UUID
    name: str
    school_id: UUID
    school_level_id: UUID
    level_name: str
    subject_ids: List[UUID]
    subject_names: List[str]


class PaginatedCourse(SQLModel):
    courses: List[CourseRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool


class SchoolLevelOptionRead(SQLModel):
    id: UUID
    name: str


class SubjectOptionRead(SQLModel):
    id: UUID
    name: str


class CourseFormOptionsRead(SQLModel):
    school_levels: List[SchoolLevelOptionRead]
    subjects: List[SubjectOptionRead]
