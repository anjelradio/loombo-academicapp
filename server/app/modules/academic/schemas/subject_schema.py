import re
from typing import Annotated, List
from uuid import UUID

from pydantic import StringConstraints, field_validator
from sqlmodel import SQLModel


class SubjectCreate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=70)]

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        normalized_name = " ".join(value.split())

        if len(normalized_name) < 3 or len(normalized_name) > 70:
            raise ValueError("El nombre de la materia debe tener entre 3 y 70 caracteres")

        if not re.fullmatch(r"[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+", normalized_name):
            raise ValueError("El nombre contiene caracteres no permitidos")

        return normalized_name


class SubjectUpdate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=70)]

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        normalized_name = " ".join(value.split())

        if len(normalized_name) < 3 or len(normalized_name) > 70:
            raise ValueError("El nombre de la materia debe tener entre 3 y 70 caracteres")

        if not re.fullmatch(r"[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+", normalized_name):
            raise ValueError("El nombre contiene caracteres no permitidos")

        return normalized_name


class SubjectRead(SQLModel):
    id: UUID
    name: str
    school_id: UUID
    model_config = {"from_attributes": True}


class PaginatedSubject(SQLModel):
    subjects: List[SubjectRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool
