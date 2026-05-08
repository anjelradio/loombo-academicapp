import re
from typing import Annotated, List, Optional
from uuid import UUID

from pydantic import StringConstraints, field_validator
from sqlmodel import SQLModel

from app.modules.schools.models import SchoolRole
from app.modules.schools.models.school import SchoolType


class SchoolCreate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=5, max_length=70)]
    logo_image: Optional[str] = None
    type: SchoolType
    phone: Annotated[str, StringConstraints(min_length=8, max_length=20)]
    level_ids: List[UUID]

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        normalized_name = " ".join(value.split())

        if len(normalized_name) < 5 or len(normalized_name) > 70:
            raise ValueError(
                "El nombre de la escuela debe tener entre 5 y 70 caracteres"
            )

        if not re.fullmatch(r"[A-Za-z0-9À-ÖØ-öø-ÿÑñ .'-]+", normalized_name):
            raise ValueError("El nombre contiene caracteres no permitidos")

        return normalized_name

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        normalized_phone = re.sub(r"[\s\-()]+", "", value)

        if not re.fullmatch(r"\+?\d{8,15}", normalized_phone):
            raise ValueError("El telefono debe tener entre 8 y 15 digitos")

        return normalized_phone

    @field_validator("level_ids")
    @classmethod
    def validate_level_ids(cls, value: List[UUID]) -> List[UUID]:
        unique_level_ids = list(dict.fromkeys(value))
        if len(unique_level_ids) == 0:
            raise ValueError("Debes seleccionar al menos un nivel")
        return unique_level_ids


class SchoolRead(SQLModel):
    id: UUID
    name: str
    logo_image: Optional[str] = None
    type: str
    phone: str
    model_config = {"from_attributes": True}


class SchoolWithRole(SQLModel):
    id: UUID
    name: str
    logo_image: Optional[str] = None
    type: str
    phone: str
    role: SchoolRole
    model_config = {"from_attributes": True}


class PaginatedSchool(SQLModel):
    schools: List[SchoolRead]
    page: int
    per_page: int
    total: int
    total_pages: int
    has_prev: bool
    has_next: bool


class LevelRead(SQLModel):
    id: UUID
    name: str
    model_config = {"from_attributes": True}
