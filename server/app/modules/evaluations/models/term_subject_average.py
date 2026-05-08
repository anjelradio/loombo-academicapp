from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class TermSubjectAverage(UUIDBaseModel, table=True):
    __tablename__ = "term_subject_averages"
    __table_args__ = (
        Index(
            "uq_term_subject_averages_assignment_term_student_active",
            "assignment_id",
            "term_id",
            "student_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    assignment_id: UUID = Field(foreign_key="assignments.id", index=True)
    term_id: UUID = Field(foreign_key="terms.id", index=True)
    student_id: UUID = Field(foreign_key="students.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)

    saber_score: float
    hacer_score: float
    ser_score: float
    autoevaluacion_score: float
    final_score: float
