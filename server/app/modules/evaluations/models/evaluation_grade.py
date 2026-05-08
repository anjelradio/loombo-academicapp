from uuid import UUID

from sqlalchemy import Index, text
from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class EvaluationGrade(UUIDBaseModel, table=True):
    __tablename__ = "evaluation_grades"
    __table_args__ = (
        Index(
            "uq_evaluation_grades_eval_student_active",
            "evaluation_id",
            "student_id",
            unique=True,
            sqlite_where=text("state = 1"),
            postgresql_where=text("state = true"),
        ),
    )

    score: float
    observation: str | None = Field(default=None, max_length=300)

    evaluation_id: UUID = Field(foreign_key="evaluations.id", index=True)
    student_id: UUID = Field(foreign_key="students.id", index=True)
    school_id: UUID = Field(foreign_key="school.id", index=True)
