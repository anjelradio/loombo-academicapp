from datetime import date
from typing import Annotated
from uuid import UUID

from pydantic import StringConstraints, field_validator
from sqlmodel import SQLModel


class TermCreate(SQLModel):
    name: Annotated[str, StringConstraints(min_length=3, max_length=30)]
    start_date: date
    end_date: date

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        normalized_name = " ".join(value.split())
        if len(normalized_name) < 3 or len(normalized_name) > 30:
            raise ValueError("El nombre del trimestre debe tener entre 3 y 30 caracteres")
        return normalized_name

    @field_validator("end_date")
    @classmethod
    def validate_end_date(cls, value: date, info):
        start_date = info.data.get("start_date")
        if start_date and value <= start_date:
            raise ValueError("La fecha fin debe ser mayor que la fecha inicio")
        return value


class TermUpdate(TermCreate):
    pass


class TermRead(SQLModel):
    id: UUID
    name: str
    start_date: date
    end_date: date
    school_id: UUID
    model_config = {"from_attributes": True}


class EvaluationWeightUpsert(SQLModel):
    ser: int
    saber: int
    hacer: int
    autoevaluacion: int

    @field_validator("ser", "saber", "hacer", "autoevaluacion")
    @classmethod
    def validate_range(cls, value: int) -> int:
        if value < 0 or value > 100:
            raise ValueError("Cada ponderacion debe estar entre 0 y 100")
        return value

    @field_validator("autoevaluacion")
    @classmethod
    def validate_total(cls, value: int, info):
        ser = info.data.get("ser", 0)
        saber = info.data.get("saber", 0)
        hacer = info.data.get("hacer", 0)
        if ser + saber + hacer + value != 100:
            raise ValueError("La suma de ponderaciones debe ser 100")
        return value


class EvaluationWeightLevelRead(SQLModel):
    school_level_id: UUID
    level_name: str
    has_configured: bool
    ser: int | None = None
    saber: int | None = None
    hacer: int | None = None
    autoevaluacion: int | None = None


class EvaluationWeightRead(SQLModel):
    id: UUID
    school_id: UUID
    school_level_id: UUID
    ser: int
    saber: int
    hacer: int
    autoevaluacion: int
    model_config = {"from_attributes": True}
